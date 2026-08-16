// LOCAL STORAGE SETTINGS
const STORAGE_KEY = "signupPeople";

const THEME_KEY = "signupTheme";
// 1. SAVE HELPER
function save(people) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(people));
}
// 2. LOAD HELPER
function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    // Nothing saved yet
    if (raw === null) {
      return [];
    }

    const data = JSON.parse(raw);

    // Make sure the stored data is an array
    if (!Array.isArray(data)) {
      return [];
    }

    return data;
  } catch (error) {
    // Corrupt JSON
    return [];
  }
}

// GET HTML ELEMENTS

const form = document.querySelector("#signupForm");

const nameInput = document.querySelector("#name");

const phoneInput = document.querySelector("#phone");

const error = document.querySelector("#error");

const count = document.querySelector("#count");

const themeToggle = document.querySelector("#themeToggle");

// 3. ETHIOPIAN PHONE REGEX

const ethiopianPhoneRegex = /^(?:\+251|251|0)(9|7)\d{8}$/;

// 4. DISPLAY NUMBER OF PEOPLE
function updateCount() {
  const people = load();

  count.textContent = `${people.length} people have signed up.`;
}

// 5. SIGNUP FORM
form.addEventListener("submit", function (event) {
  // Stop the page from refreshing
  event.preventDefault();
  error.textContent = "";

  // Read and trim values
  const name = nameInput.value.trim();

  const phone = phoneInput.value.trim();

  if (name.length < 2) {
    error.textContent = "Name must be at least 2 characters.";

    return;
  }
  if (!ethiopianPhoneRegex.test(phone)) {
    error.textContent = "Please enter a valid Ethiopian phone number.";

    return;
  }
  // Success
  const people = load();

  // Create new signup entry
  const person = {
    name: name,
    phone: phone,
  };
  // Add the new person
  people.push(person);
  // Save the updated array
  save(people);
  // Clear form
  form.reset();
  // Show success message
  error.textContent = "Signup successful!";
  error.style.color = "green";
  // Update signup count
  updateCount();
});
// 6. THEME TOGGLE
themeToggle.addEventListener("click", function () {
  // Toggle dark class
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");

  // Update button text
  if (isDark) {
    themeToggle.textContent = "☀️ Light Mode";
  } else {
    themeToggle.textContent = "🌙 Dark Mode";
  }
});

// 7. RESTORE THEME WHEN PAGE LOADS
function restoreTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️ Light Mode";
  } else {
    document.body.classList.remove("dark");
    themeToggle.textContent = "🌙 Dark Mode";
  }
}

// 8. RUN WHEN PAGE LOADS
restoreTheme();
updateCount();