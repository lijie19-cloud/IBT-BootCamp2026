async function getUsdToEtbRate() {
  const url = "https://open.er-api.com/v6/latest/USD";

  const res = await fetch(url);

  // fetch() does NOT automatically reject for 404/500.
  // Therefore we must check res.ok.
  if (!res.ok) {
    throw new Error(`HTTP error: ${res.status}`);
  }

  const data = await res.json();
  return data.rates.ETB;
}

// Display the exchange rate
document.getElementById("rateBtn").addEventListener("click", async function () {
  const result = document.getElementById("rateResult");

  result.textContent = "Loading...";
  result.className = "loading";

  try {
    const rate = await getUsdToEtbRate();

    result.textContent = `1 USD = ${rate.toFixed(2)} ETB`;

    result.className = "success";
  } catch (error) {
    result.textContent = `Error: ${error.message}`;

    result.className = "error";
  }
});
// New async/await version
async function fetchAndRenderPost() {
  const result = document.getElementById("postResult");

  result.textContent = "Loading...";
  result.className = "loading";

  try {
    // STEP 1: Fetch data
    const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");

    // Check HTTP status
    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }

    // STEP 2: Convert response to JSON
    const data = await res.json();

    // STEP 3: Render the data
    result.innerHTML = `
            <h3>${data.title}</h3>
            <p>${data.body}</p>
        `;

    result.className = "success";
  } catch (error) {
    result.textContent = `Error: ${error.message}`;

    result.className = "error";
  }
}

document
  .getElementById("postBtn")
  .addEventListener("click", fetchAndRenderPost);
// -------- WRONG URL --------
async function testWrongUrl() {
  const result = document.getElementById("errorResult");

  result.textContent = "Testing wrong URL...";

  try {
    // This domain does not exist.
    const res = await fetch(
      "https://this-domain-does-not-exist-12345.com/data",
    );

    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }

    const data = await res.json();

    result.textContent = JSON.stringify(data);
  } catch (error) {
    result.innerHTML = `
            <p class="error">
                <strong>Catch block ran!</strong>
            </p>

            <p>
                Wrong URL caused a network/fetch error:
                ${error.message}
            </p>
        `;
  }
}

document.getElementById("wrongBtn").addEventListener("click", testWrongUrl);

// -------- REAL URL THAT RETURNS 404 --------

async function test404() {
  const result = document.getElementById("errorResult");

  result.textContent = "Testing 404 URL...";

  try {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/posts/999999",
    );
 if (!res.ok) {
      throw new Error(`HTTP error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    result.textContent = JSON.stringify(data);
  } catch (error) {
    result.innerHTML = `
            <p class="error">
                <strong>404 handled by catch!</strong>
            </p>

            <p>
                ${error.message}
            </p>

            <p>
                This happened because we manually checked
                <strong>res.ok</strong>.
            </p>
        `;
  }
}

document.getElementById("notFoundBtn").addEventListener("click", test404);
async function fetchFirstTwoPostsAndUsers() {
  const result = document.getElementById("parallelResult");

  result.textContent = "Loading...";
  result.className = "loading";

  try {
    // First fetch the list of posts
    const postsResponse = await fetch(
      "https://jsonplaceholder.typicode.com/posts",
    );

    if (!postsResponse.ok) {
      throw new Error(`Posts request failed: ${postsResponse.status}`);
    }

    const posts = await postsResponse.json();

    // Take the first two posts
    const firstTwoPosts = posts.slice(0, 2);
    const userRequests = firstTwoPosts.map(async (post) => {
      const userResponse = await fetch(
        `https://jsonplaceholder.typicode.com/users/${post.userId}`,
      );

      if (!userResponse.ok) {
        throw new Error(`User request failed: ${userResponse.status}`);
      }

      return userResponse.json();
    });
    const users = await Promise.all(userRequests);

    // Render results
    result.innerHTML = "";

    firstTwoPosts.forEach((post, index) => {
      const user = users[index];

      result.innerHTML += `
                <article>
                    <h3>${post.title}</h3>

                    <p>
                        ${post.body}
                    </p>

                    <strong>
                        Author: ${user.name}
                    </strong>

                    <hr>
                </article>
            `;
    });

    result.className = "success";
  } catch (error) {
    result.textContent = `Error: ${error.message}`;

    result.className = "error";
  }
}

document
  .getElementById("parallelBtn")
  .addEventListener("click", fetchFirstTwoPostsAndUsers);
// SUCCESS STATE
async function showSuccess() {
  const status = document.getElementById("status");

  // State 1: LOADING
  status.textContent = "Loading...";
  status.className = "loading";

  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts/1",
    );

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();

    // State 2: SUCCESS
    status.innerHTML = `
            <strong>Success!</strong>

            <p>
                ${data.title}
            </p>
        `;
    status.className = "success";
  } catch (error) {
    // State 3: ERROR
    status.textContent = `Error: ${error.message}`;

    status.className = "error";
  }
}
document.getElementById("successBtn").addEventListener("click", showSuccess);
// LOADING STATE DEMONSTRATION
function showLoading() {
  const status = document.getElementById("status");
  status.textContent = "Loading... Please wait.";
  status.className = "loading";
}
document.getElementById("loadBtn").addEventListener("click", showLoading);
// ERROR STATE DEMONSTRATION
async function showError() {
  const status = document.getElementById("status");

  // Loading state first
  status.textContent = "Loading...";
  status.className = "loading";
  try {
    // Deliberately wrong URL
    const response = await fetch("https://wrong-domain-example-99999.com/api");

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
    status.textContent = JSON.stringify(data);
  } catch (error) {
    // Error state
    status.textContent = `Error: ${error.message}`;

    status.className = "error";
  }
}
document.getElementById("errorBtn").addEventListener("click", showError);