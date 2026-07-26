# ---------------- Account ----------------

class Account:
    def __init__(self, owner, number, balance=0):
        self.owner = owner
        self.account_number = number
        self.__balance = balance

        # Observer list
        self._observers = []

        # History stack
        self.history = []

    @property
    def balance(self):
        return self.__balance

    # Observer methods
    def subscribe(self, observer):
        self._observers.append(observer)

    def _notify(self, message):
        for observer in self._observers:
            observer.update(message)

    # Deposit
    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")

        self.__balance += amount

        # Save transaction
        self.history.append(("deposit", amount))

        self._notify(f"{self.owner} deposited ETB {amount}")

    # Withdraw
    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")

        if amount > self.__balance:
            raise ValueError("Insufficient balance")

        self.__balance -= amount

        # Save transaction
        self.history.append(("withdraw", amount))

        self._notify(f"{self.owner} withdrew ETB {amount}")

    # Undo last transaction
    def undo_last(self):
        if not self.history:
            print("No transaction to undo.")
            return

        action, amount = self.history.pop()

        if action == "deposit":
            self.__balance -= amount

        elif action == "withdraw":
            self.__balance += amount

        print(f"Undo: {action} ETB {amount}")

    # Recursive transaction counter
    def total_transactions(self):
        return self._count_transactions(self.history)

    def _count_transactions(self, history):
        if not history:
            return 0
        return 1 + self._count_transactions(history[:-1])

    # Statement
    def statement(self):
        print(f"Account: {self.owner}  Balance: ETB {self.balance}")


# ---------------- SavingsAccount ----------------

class SavingsAccount(Account):
    def __init__(self, owner, number, balance=0, rate=0.05):
        super().__init__(owner, number, balance)
        self.rate = rate

    def add_interest(self):
        interest = self.balance * self.rate
        self.deposit(interest)

    def statement(self):
        print(f"Savings Account: {self.owner}  Balance: ETB {self.balance}")


# ---------------- CurrentAccount ----------------

class CurrentAccount(Account):
    def __init__(self, owner, number, balance=0, overdraft=500):
        super().__init__(owner, number, balance)
        self.overdraft = overdraft

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")

        if amount > self.balance + self.overdraft:
            raise ValueError("Overdraft limit exceeded")

        self._Account__balance -= amount

        self.history.append(("withdraw", amount))

        self._notify(f"{self.owner} withdrew ETB {amount}")

    def statement(self):
        print(f"Current Account: {self.owner}  Balance: ETB {self.balance}")


# ---------------- Alert Classes ----------------

class AlertService:
    def update(self, message):
        pass


class SMSAlert(AlertService):
    def update(self, message):
        print("SMS:", message)


# ---------------- Factory ----------------

class AccountFactory:

    @staticmethod
    def create(kind, owner, number, balance=0, **kwargs):

        if kind.lower() == "savings":
            return SavingsAccount(
                owner,
                number,
                balance,
                kwargs.get("rate", 0.05)
            )

        elif kind.lower() == "current":
            return CurrentAccount(
                owner,
                number,
                balance,
                kwargs.get("overdraft", 500)
            )

        else:
            raise ValueError("Unknown account type")


# ---------------- Account Registry ----------------

class AccountRegistry:

    def __init__(self):
        self.accounts = {}

    # O(1)
    def add(self, account):
        self.accounts[account.account_number] = account

    # O(1)
    def find(self, number):
        return self.accounts.get(number)

    # Ordered list
    def list_all(self):
        return [self.accounts[key] for key in sorted(self.accounts)]

    # Top N accounts by balance
    def top_by_balance(self, n):
        return sorted(
            self.accounts.values(),
            key=lambda account: account.balance,
            reverse=True
        )[:n]

    # Binary Search
    def binary_search(self, accounts, target):
        low = 0
        high = len(accounts) - 1

        while low <= high:
            mid = (low + high) // 2

            if accounts[mid].account_number == target:
                return accounts[mid]

            elif accounts[mid].account_number < target:
                low = mid + 1

            else:
                high = mid - 1

        return None

    # Search using binary search
    def find_by_number(self, number):
        ordered_accounts = self.list_all()
        return self.binary_search(ordered_accounts, number)


# ---------------- Main Program ----------------

sms = SMSAlert()

registry = AccountRegistry()

# Open accounts using factory
acc1 = AccountFactory.create(
    "savings",
    "Addis",
    "S001",
    1000,
    rate=0.10
)

acc2 = AccountFactory.create(
    "current",
    "Abel",
    "C001",
    500,
    overdraft=300
)

acc3 = AccountFactory.create(
    "savings",
    "Hana",
    "S002",
    2000,
    rate=0.05
)

# Subscribe alerts
acc1.subscribe(sms)
acc2.subscribe(sms)
acc3.subscribe(sms)

# Add accounts to registry
registry.add(acc1)
registry.add(acc2)
registry.add(acc3)

# Transactions
acc1.deposit(500)
acc1.add_interest()

acc2.withdraw(700)

acc3.deposit(300)
acc3.withdraw(100)

# Undo last transaction
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
print("\nTop 2 Accounts by Balance:")
for account in registry.top_by_balance(2):
    account.statement()

# Binary search
print("\nBinary Search for C001:")
account = registry.find_by_number("C001")
if account:
    account.statement()
else:
    print("Account not found")

# Recursive transaction counts
print("\nTransaction Counts:")
print(f"{acc1.owner}: {acc1.total_transactions()}")
print(f"{acc2.owner}: {acc2.total_transactions()}")
print(f"{acc3.owner}: {acc3.total_transactions()}")