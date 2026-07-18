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