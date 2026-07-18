# 1 Book class
class Book:
    def __init__(self, title, author, pages):
        self.title = title
        self.author = author
        self.pages = pages

    def describe(self):
        print(f'"{self.title}" by {self.author} - {self.pages} pages')


#2 Create two books
book1 = Book("FIKIR ESKE MEKABIR", "HADDIS ALEMAYEHU", 650)
book2 = Book("EMEGUA", "BEALU GIRMA", 345)

print("Books:")
book1.describe()
book2.describe()


print("\n" + "=" * 40)


# 2, 3, 4. Product class
class Product:
    def __init__(self, name, price, quantity):
        self.name = name
        self.price = price  # ETB
        self.__quantity = quantity  # Private attribute

    # Getter
    @property
    def quantity(self):
        return self.__quantity

    # Setter with validation
    @quantity.setter
    def quantity(self, value):
        if value < 0:
            print("Error: Quantity cannot be negative.")
        else:
            self.__quantity = value

    # Restock method
    def restock(self, n):
        if n > 0:
            self.__quantity += n
            print(f"{self.name} restocked by {n}.")
        else:
            print("Restock amount must be positive.")

    # Sell method
    def sell(self, n):
        if n <= 0:
            print("Sale amount must be positive.")
        elif n > self.__quantity:
            print(f"Not enough {self.name} in stock!")
        else:
            self.__quantity -= n
            print(f"Sold {n} {self.name}(s).")

    def display(self):
        print(f"{self.name}: {self.price} ETB, Quantity = {self.__quantity}")


# 5. Prove independence
product1 = Product("PC", 50000, 8)
product2 = Product("Phone", 21000, 12)
product3 = Product("Car", 12000000, 3)

print("Products:")
product1.display()
product2.display()
product3.display()

print("\nSelling 1 Phone...")
product2.sell(1)

print("\nRestocking 2 PC...")
product1.restock(2)

print("\nAttempting to sell too many PC...")
product1.sell(10)

print("\nFinal Products:")
product1.display()
product2.display()
product3.display()