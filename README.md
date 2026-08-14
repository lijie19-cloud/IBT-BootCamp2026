# Addis Market Shopping List

A simple single-page shopping list application built with HTML, CSS, and JavaScript.

## Features

* Add grocery items using a form.
* Validate the item name before adding it.
* Mark items as bought.
* Remove items from the list.
* Display the number of items remaining.
* Use `data-id` to identify each item.
* Use event delegation for list clicks.
* Re-render the list whenever the state changes.
* Style bought items using the `.done` CSS class.

## Project Structure

```text
addis-market/
├── index.html
├── styles.css
├── app.js
└── README.md
```

## How It Works

The application uses a **state-then-render** approach.

The shopping items are stored in an array:

```js
const items = [];
```

When the state changes, `render()` rebuilds the list:

```text
User action
    ↓
Update items array
    ↓
render()
    ↓
Update the page
```

## JavaScript Concepts Used

* Arrays
* Objects
* Functions
* `push()`
* `filter()`
* `find()`
* `findIndex()`
* `splice()`
* `forEach()`
* `addEventListener()`
* `preventDefault()`
* Event delegation
* `dataset`
* `classList`
* Template literals
* DOM manipulation

## Item Structure

Each shopping item is stored as an object:

```js
{
  id: 1,
  name: "Tomatoes",
  done: false
}
```

* `id` uniquely identifies the item.
* `name` stores the grocery name.
* `done` indicates whether the item has been bought.

## Running the Project

Open `index.html` in a web browser.

You can also open the project folder in VS Code and use the Live Server extension if it is installed.

## Self-Check

* [x] Form adds a new grocery item.
* [x] Empty item names are rejected.
* [ ] The form does not reload the page.
* [ ] Items are stored in an array.
* [ ] `render()` rebuilds the list from the array.
* [ ] Each row has a `data-id`.
* [ ] Clicking an item toggles its bought state.
* [ ] Bought items use the `.done` class.
* [ ] Remove deletes the correct item.
* [ ] The remaining-item counter updates after every change.
* [ ] List clicks use event delegation.
* [ ] The original item state is not replaced with inline styles.

## Example

Adding:

```text
Tomatoes
Milk
Bread
```

shows:

```text
3 items remaining
```

After marking Milk as bought:

```text
2 items remaining
```

After removing Bread:

```text
1 item remaining
```

## Author
- Lijie19-cloud
