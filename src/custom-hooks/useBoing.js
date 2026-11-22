import { useRef, useCallback } from 'react'

export default function useBoing(enabled = true) {
  const ctxRef = useRef(null)
  const lastPlayRef = useRef(0)

  return useCallback(() => {
    if (!enabled) return

    // Throttle: skip if played in the last 150ms
    const now = Date.now()
    if (now - lastPlayRef.current < 150) return
    lastPlayRef.current = now

    // Create the AudioContext once, on first use
    if (!ctxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (!AudioCtx) return
      ctxRef.current = new AudioCtx()
    }
    const ctx = ctxRef.current
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {
        // Audio is optional; ignore resume failures and try again on the next hover.
      })
    }

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const t = ctx.currentTime

    // Pitch: low -> high -> mid (the "boing")
    osc.type = 'sine'
    osc.frequency.setValueAtTime(200, t)
    osc.frequency.exponentialRampToValueAtTime(600, t + 0.08)
    osc.frequency.exponentialRampToValueAtTime(250, t + 0.25)

    // Volume: quick fade in, fade out
    gain.gain.setValueAtTime(0.0001, t)
    gain.gain.exponentialRampToValueAtTime(0.3, t + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.3)

    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(t)
    osc.stop(t + 0.3)

    // Haptics, only where supported
    if (navigator.vibrate) navigator.vibrate(30)
  }, [enabled])
}
