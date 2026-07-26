from collections import deque

# ---------------- Account ----------------

class Account:
    def __init__(self, owner, number, balance=0):
        self.owner = owner
        self.account_number = number
        self.__balance = balance

        self._observers = []
        self.history = []

    @property
    def balance(self):
        return self.__balance

    def subscribe(self, observer):
        self._observers.append(observer)

    def _notify(self, message):
        for observer in self._observers:
            observer.update(message)

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")

        self.__balance += amount
        self.history.append(("deposit", amount))
        self._notify(f"{self.owner} deposited ETB {amount}")

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")

        if amount > self.__balance:
            raise ValueError("Insufficient balance")

        self.__balance -= amount
        self.history.append(("withdraw", amount))
        self._notify(f"{self.owner} withdrew ETB {amount}")

    def undo_last(self):
        if not self.history:
            print("No transaction to undo.")
            return

        action, amount = self.history.pop()

        if action == "deposit":
            self.__balance -= amount
        else:
            self.__balance += amount

        print(f"Undo: {action} ETB {amount}")

    def total_transactions(self):
        return self._count_transactions(self.history)

    def _count_transactions(self, history):
        if not history:
            return 0
        return 1 + self._count_transactions(history[:-1])

    def statement(self):
        print(f"Account: {self.owner} Balance: ETB {self.balance}")


# ---------------- Savings Account ----------------

class SavingsAccount(Account):

    def __init__(self, owner, number, balance=0, rate=0.05):
        super().__init__(owner, number, balance)
        self.rate = rate

    def add_interest(self):
        interest = self.balance * self.rate
        self.deposit(interest)

    def statement(self):
        print(f"Savings Account: {self.owner} Balance: ETB {self.balance}")


# ---------------- Current Account ----------------

class CurrentAccount(Account):

    def __init__(self, owner, number, balance=0, overdraft=500):
        super().__init__(owner, number, balance)
        self.overdraft = overdraft

    def withdraw(self, amount):

        if amount <= 0:
            raise ValueError("Amount must be positive")

        if amount > self.balance + self.overdraft:
            raise ValueError("Overdraft exceeded")

        self._Account__balance -= amount
        self.history.append(("withdraw", amount))
        self._notify(f"{self.owner} withdrew ETB {amount}")

    def statement(self):
        print(f"Current Account: {self.owner} Balance: ETB {self.balance}")


# ---------------- Alerts ----------------

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


# ---------------- Registry ----------------

class AccountRegistry:

    def __init__(self):
        self.accounts = {}

    def add(self, account):
        self.accounts[account.account_number] = account

    def find(self, number):
        return self.accounts.get(number)

    def list_all(self):
        return [self.accounts[k] for k in sorted(self.accounts)]

    def top_by_balance(self, n):
        return sorted(
            self.accounts.values(),
            key=lambda acc: acc.balance,
            reverse=True
        )[:n]

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

    def find_by_number(self, number):
        return self.binary_search(self.list_all(), number)


# ---------------- Branch Tree ----------------

class Branch:

    def __init__(self, name):
        self.name = name
        self.accounts = []
        self.children = []

    def add_account(self, account):
        self.accounts.append(account)

    def add_branch(self, branch):
        self.children.append(branch)

    # Recursive total balance
    def total_balance(self):

        total = sum(account.balance for account in self.accounts)

        for child in self.children:
            total += child.total_balance()

        return total


# ---------------- BFS ----------------

def bfs(graph, start):

    visited = set()
    queue = deque([start])

    while queue:

        node = queue.popleft()

        if node not in visited:
            visited.add(node)

            for neighbor in graph.get(node, []):
                queue.append(neighbor)

    return visited


# ---------------- Main ----------------

sms = SMSAlert()

registry = AccountRegistry()

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

for acc in [acc1, acc2, acc3]:
    acc.subscribe(sms)
    registry.add(acc)

# Transactions

acc1.deposit(500)
acc1.add_interest()

acc2.withdraw(700)

acc3.deposit(300)
acc3.withdraw(100)
acc3.undo_last()

# ---------------- Branch Tree ----------------

head = Branch("Head Office")

region1 = Branch("North Region")
region2 = Branch("South Region")

branch1 = Branch("CBE-1")
branch2 = Branch("CBE-2")
branch3 = Branch("CBE-3")

head.add_branch(region1)
head.add_branch(region2)

region1.add_branch(branch1)
region1.add_branch(branch2)

region2.add_branch(branch3)

branch1.add_account(acc1)
branch2.add_account(acc2)
branch3.add_account(acc3)

print("\nBank Total Balance")
print("ETB", head.total_balance())

# ---------------- Transfer Graph ----------------

transfers = {
    "CBE-1": ["CBE-2", "CBE-3"],
    "CBE-2": ["CBE-3"],
    "CBE-3": ["CBE-1"]
}

reachable = bfs(transfers, "CBE-1")

print("\nBranches reachable from CBE-1")

for branch in sorted(reachable):
    print(branch)

# ---------------- Previous Tests ----------------

print("\nTop 2 Accounts")

for account in registry.top_by_balance(2):
    account.statement()

print("\nBinary Search")

account = registry.find_by_number("C001")

if account:
    account.statement()

print("\nTransaction Counts")

print(acc1.owner, ":", acc1.total_transactions())
print(acc2.owner, ":", acc2.total_transactions())
print(acc3.owner, ":", acc3.total_transactions())