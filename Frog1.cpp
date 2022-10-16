#include <bits/stdc++.h>
using namespace std;
int main(int argc, char const *argv[])
{

int n;
cin>>n;
vector<int> h(n+1);
for(int i=1;i<=n;i++)
cin>>h[i];
int f[n+1];
for(int i=0;i<=n;i++)
f[i]=0;

f[1]=0;
f[2]=abs(h[2]-h[1]);
for(int i=3;i<=n;i++)
{
    f[i]=min(f[i-1]+abs(h[i-1]-h[i]),f[i-2]+abs(h[i]-h[i-2]));

}
cout<<f[n];

    return 0;
}
