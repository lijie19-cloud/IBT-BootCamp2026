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

        # Save transaction
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

# Find account
print("\nFind Account S001:")
account = registry.find("S001")
if account:
    account.statement()

# Display all accounts
print("\nAll Account Statements:")
for account in registry.list_all():
    account.statement()