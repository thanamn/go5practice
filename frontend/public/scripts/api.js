import { BACKEND_URL } from "./config.js";

/** @typedef {import("./config.js").Item} Item */
/** @typedef {import("./config.js").ItemPayload} ItemPayload */

export async function getItems() {
  /** @type {Item[]} */
  const items = await fetch(`${BACKEND_URL}/items`).then((r) => r.json());
  return items;
}


/**
 * @param {ItemPayload} item
 */
export async function createItem(item) {
  await fetch(`${BACKEND_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
}

export async function deleteItem(id) {
  await fetch(`${BACKEND_URL}/items/${id}`, {
    method: "DELETE",
  });
}

export async function filterItem(filterName) {
  const response = await fetch(`${BACKEND_URL}/items/filter`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ filter: filterName }),
  });

  if (!response.ok) {
    const errorText = await response.text(); // Read the response as text for debugging
    console.error('Response Error:', errorText);
    throw new Error('Network response was not ok.');
  }
  const filteredItems = await response.json();
  return filteredItems;
}
