class Account:
    def __init__(self, owner, number, balance=0):
        self.owner = owner
        self.account_number = number
        self.__balance = balance

    @property
    def balance(self):
        return self.__balance
#deposit
    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        self.__balance += amount
#withdraw
    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        if amount > self.__balance:
            raise ValueError("Insufficient balance")
        self.__balance -= amount
#Statement
    def statement(self):
        print(f"Account: {self.owner}  Balance: ETB {self.balance}")


# SavingsAccount
class SavingsAccount(Account):
    def __init__(self, owner, number, balance=0, rate=0.05):
        super().__init__(owner, number, balance)
        self.rate = rate

    def add_interest(self):
        interest = self.balance * self.rate
        self.deposit(interest)

    def statement(self):
        print(f"Savings Account: {self.owner}  Balance: ETB {self.balance}")


# CurrentAccount
class CurrentAccount(Account):
    def __init__(self, owner, number, balance=0, overdraft=500):
        super().__init__(owner, number, balance)
        self.overdraft = overdraft

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")

        if amount > self.balance + self.overdraft:
            raise ValueError("Overdraft limit exceeded")

        # Access the private balance through name mangling
        self._Account__balance -= amount

    def statement(self):
        print(f"Current Account: {self.owner}  Balance: ETB {self.balance}")


# Create accounts
acc1 = SavingsAccount("Addis", "S001", 1000, 0.10)
acc2 = CurrentAccount("Abel", "C001", 500, 300)
acc3 = SavingsAccount("Hana", "S002", 2000, 0.05)

# Add interest to savings account
acc1.add_interest()

# Withdraw using overdraft
acc2.withdraw(700)

# Mixed list of accounts
accounts = [acc1, acc2, acc3]

# Loop over the mixed list and call statement()
print("Account Statements:")
for account in accounts:
    account.statement()


       #DAY 6 EXERCISE

class AlertService:
    def send(self, message):
        print("Alert:", message)


class SMSAlert(AlertService):
    def update(self, message):
        print("SMS:", message)

        from accounts import SavingsAccount, CurrentAccount


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

    from factory import AccountFactory
from alerts import SMSAlert

# Create alert object
sms = SMSAlert()

# Open accounts using the factory
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

# Attach SMS observer
acc1.subscribe(sms)
acc2.subscribe(sms)

# Transactions
acc1.deposit(500)
acc1.add_interest()

acc2.withdraw(700)

# Statements
print()
acc1.statement()
acc2.statement()