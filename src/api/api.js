const API_BASE_URL = "/data";

/**
 * Generic function for fetching JSON data.
 */
async function fetchData(endpoint) {
  const response = await fetch(`${API_BASE_URL}/${endpoint}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}. Status: ${response.status}`);
  }

  return response.json();
}

/**
 * Load all clubs.
 */
export async function loadClubs() {
  return fetchData("clubs.json");
}

/**
 * Load all events.
 */
export async function loadEvents() {
  return fetchData("events.json");
}

/**
 * Load all resources.
 */
export async function loadResources() {
  return fetchData("resources.json");
}
