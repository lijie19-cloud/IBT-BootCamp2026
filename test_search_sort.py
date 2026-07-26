#test search sort
print("\nUndo last transaction for Hana:")
acc3.undo_last()

# Find account using dictionary
print("\nFind Account S001:")
account = registry.find("S001")
if account:
    account.statement()

# Display all accounts
print("\nAll Account Statements:")
for account in registry.list_all():
    account.statement()

# Top balances
print("\nTop 2 Accounts by Balance")
for account in registry.top_by_balance(2):
    account.statement()

# Binary search
print("\nBinary Search for C001")
account = registry.find_by_number("C001")
if account:
    account.statement()

# Recursive transaction count
print("\nTransaction Counts")
print("Addis:", acc1.total_transactions())
print("Abel :", acc2.total_transactions())
print("Hana :", acc3.total_transactions())