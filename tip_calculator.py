#In-class exercise for Telebir Tip Calculator
bill_total = 1200.0
number_of_people = 3

# List of friends
friends = ["Abebe", "Chala", "Hagos"]

#Function
def split_bill(total, people, tip_rate=0.10):
    tip = total * tip_rate
    total_with_tip = total + tip
    return total_with_tip / people

#Compute the per-person amount
share = split_bill(bill_total, number_of_people)

#Loop over the list of names and print each person's share
print("Restaurant Bill Splitter")
print(f"Total Bill: ETB {bill_total}")
print(f"Each one pays: ETB {share:.2f}\n")

for friend in friends:
    print(f"{friend} should pay ETB {share:.2f}") 