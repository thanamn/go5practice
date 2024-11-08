import { createItem, deleteItem, filterItem, getItems } from "./api.js";

/** @typedef {import("./config.js").Item} Item */
/** @typedef {import("./config.js").ItemPayload} ItemPayload */

/**
 * @param {Item[]} items
 */
function drawTable(items) {
  /** @type {HTMLTableSectionElement} */
  const table = document.getElementById("main-table-body");

  // Clear all elements
  table.innerHTML = "";

  for (const item of items) {
    const row = table.insertRow();
    row.insertCell().innerText = item.item;
    row.insertCell().innerText = item.name;
    row.insertCell().innerText = item.price;

    const button = document.createElement("button");
    button.addEventListener("click", () => handleDelete(item._id));
    button.innerText = "ลบ";

    row.insertCell().appendChild(button);
  }
}

export async function fetchAndDrawTable() {
  const lastFilter = localStorage.getItem('currentFilter') || "-- ทั้งหมด --";
  const items = await filterItem(lastFilter);
  drawTable(items);
}

/**
 * @param {string} id
 */
export async function handleDelete(id) {
  await deleteItem(id);
  await fetchAndDrawTable();
}

export async function handleCreateItem() {
  /** @type {HTMLInputElement} */
  const itemToAdd = document.getElementById("item-to-add");

  /** @type {HTMLSelectElement} */
  const nameToAdd = document.getElementById("name-to-add");

  /** @type {HTMLInputElement} */
  const priceToAdd = document.getElementById("price-to-add");

  const payload = {
    item: itemToAdd.value,
    name: nameToAdd.value,
    price: priceToAdd.value,
  };

  await createItem(payload);
  await fetchAndDrawTable();

  itemToAdd.value = "";
  nameToAdd.value = "0";
  priceToAdd.value = "";
}

export async function handleFilterItem() {
  const filterName = document.getElementById("filter-name").value;
  // Filter items and redraw table
  const items = await filterItem(filterName);
  drawTable(items);

  // Optionally, you could store the current filter in localStorage to persist across page reloads
  localStorage.setItem('currentFilter', filterName);
}

// On page load, apply the last used filter if available

