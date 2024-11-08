import { MEMBERS } from "./config.js";

export function populateMembers() {
  /** @type {HTMLUListElement} */
  const memberList = document.getElementById("member-list");

  /** @type {HTMLSelectElement} */
  const nameSelect = document.getElementById("name-to-add");
  const filterSelect = document.getElementById("filter-name");

  MEMBERS.forEach((member) => {
    const li = document.createElement("li");
    li.textContent = member;
    memberList.appendChild(li);

    const option = document.createElement("option");
    option.value = option.textContent = member;
    nameSelect.appendChild(option);
  });
  MEMBERS.forEach((member) => {
    const option = document.createElement("option");
    option.value = option.textContent = member;
    filterSelect.appendChild(option)
  });
}
