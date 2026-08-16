const form = document.querySelector("#searchForm");
const input = document.querySelector("#country");
const out = document.querySelector("#facts");

function render(container, label, value) {
  const li = document.createElement("li");

  const strong = document.createElement("strong");

  strong.textContent = `${label}: `;

  li.appendChild(strong);

  li.appendChild(document.createTextNode(value));
  container.appendChild(li);
}

// Render currencies

function renderCurrencies(container, currencies) {
  const li = document.createElement("li");
  const strong = document.createElement("strong");
  strong.textContent = "Currencies: ";
  li.appendChild(strong);
  const currencyNames = Object.values(currencies).map((currency) => {
    return `${currency.name} (${currency.symbol})`;
  });
  li.appendChild(document.createTextNode(currencyNames.join(", ")));

  container.appendChild(li);
}
// Fetch and display country
async function showCountry(name) {
  out.textContent = "Loading...";
  out.classList.add("loading");
  try {
    const countryName = name.trim();
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}`,
    );

    // Check HTTP status
    if (!res.ok) {
      throw new Error("Country not found");
    }

    // Convert response to JSON
    const data = await res.json();

    // API returns an array.
    // We only need the first country.
    const country = data[0];
    // Clear Loading...
    out.innerHTML = "";
    out.classList.remove("loading");
    // Render country facts using createElement
    render(out, "Country", country.name.common);

    render(out, "Capital", country.capital ? country.capital[0] : "N/A");

    render(out, "Population", country.population.toLocaleString());
    render(out, "Region", country.region);
    // Render currencies
    if (country.currencies) {
      renderCurrencies(out, country.currencies);
    } else {
      render(out, "Currencies", "N/A");
    }
    // Render flag
    const flagItem = document.createElement("li");
    const flagLabel = document.createElement("strong");
    flagLabel.textContent = "Flag: ";
    flagItem.appendChild(flagLabel);
    const flagImage = document.createElement("img");
    flagImage.src = country.flags.svg;
    flagImage.alt = `Flag of ${country.name.common}`;
    flagImage.classList.add("flag");
    flagItem.appendChild(flagImage);
    out.appendChild(flagItem);
  } catch (error) {
    out.classList.remove("loading");
    out.textContent = error.message;

    out.classList.add("error");
  }
}
// Search form
form.addEventListener("submit", function (event) {
  // Prevent page refresh
  event.preventDefault();

  const countryName = input.value;

  // Remove old error styling
  out.classList.remove("error");
  showCountry(countryName);
});
// Load Ethiopia when page opens
showCountry("Ethiopia");
