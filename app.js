const STORAGE_KEY = "signupPeople";
const PHONE = /^(?:\+251|0)9\d{8}$/;
// GET HTML ELEMENTS
const form = document.querySelector("#signupForm");

const nameInput = document.querySelector("#name");

const phoneInput = document.querySelector("#phone");

const error = document.querySelector("#error");

const peopleList = document.querySelector("#peopleList");

const count = document.querySelector("#count");
// VALIDATE
function validate(name, phone) {
  // Check name
  if (name.trim().length < 2) {
    return "Enter your full name.";
  }

  // Check phone
  if (!PHONE.test(phone)) {
    return "Enter a valid Ethiopian phone number.";
  }

  // No errors
  return "";
}

function save(people) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(people));
}
// LOAD
function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    // Nothing has been saved yet
    if (raw === null) {
      return [];
    }
    const people = JSON.parse(raw);
    // Make sure the stored data is an array
    if (!Array.isArray(people)) {
      return [];
    }
    return people;
  } catch (error) {
    // JSON is corrupt
    return [];
  }
}
// RENDER SAVED PEOPLE
function renderPeople() {
  const people = load();
  // Clear old list
  peopleList.textContent = "";
  // Show number of people
  count.textContent = `${people.length} people have signed up.`;
  // Create one <li> for each person
  people.forEach(function (person) {
    const li = document.createElement("li");
    li.textContent = `${person.name} - ${person.phone}`;
    peopleList.appendChild(li);
  });
}
// FORM SUBMIT
form.addEventListener("submit", function (event) {
  // Prevent page reload
  event.preventDefault();
  // Read and trim values
  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();
  // Validate
  const message = validate(name, phone);
  // If validation fails
  if (message !== "") {
    error.textContent = message;
    return;
  }
  // VALID ENTRY
  const people = load();
  // Create new person
  const person = {
    name: name,
    phone: phone,
  };
  // Add person to array
  people.push(person);
  // Save array as JSON
  save(people);
  // Clear the form
  form.reset();
  error.textContent = "Signup successful!";
  // Show updated people
  renderPeople();
});
// RESTORE DATA WHEN PAGE LOADS
renderPeople();