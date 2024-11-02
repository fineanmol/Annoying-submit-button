from datetime import datetime

# Function to calculate age
def calculate_age(birth_date):
    today = datetime.today()
    age = today.year - birth_date.year
    # Adjust for birth month and day
    if (today.month, today.day) < (birth_date.month, birth_date.day):
        age -= 1
    return age

# Get user input
year = int(input("Enter your birth year (YYYY): "))
month = int(input("Enter your birth month (MM): "))
day = int(input("Enter your birth day (DD): "))

# Create a date object from the input
birth_date = datetime(year, month, day)

# Calculate age and print result
age = calculate_age(birth_date)
print(f"You are {age} years old.")
