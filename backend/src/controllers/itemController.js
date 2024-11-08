import { itemFromObject } from "../models/itemModel.js";
import { items } from "../data/items.js";
import { Console } from "console";

/** @type {import("express").RequestHandler} */
export const createItem = async (req, res) => {
  try {
    const item = itemFromObject(req.body);
    items.push(item);
    res.status(200).json({ message: "OK" });
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: "Bad Request" });
  }
};

/** @type {import("express").RequestHandler} */
export const getItems = async (req, res) => {
  res.status(200).json(items);
};

/** @type {import("express").RequestHandler} */
export const deleteItem = async (req, res) => {
  try {
    const id = Number(req.params.id); // Convert the id from the URL to a number
    console.log("Received ID:", id);

    // Find the index of the item with the given numeric id
    const index = items.findIndex(item => item._id === id);

    if (index === -1) {
      console.log("Item not found for ID:", id);
      return res.status(404).json({ message: "Item not found" });
    }

    // Remove the item from the array
    items.splice(index, 1);
    console.log("Item deleted successfully:", id);

    // Send a success response
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (e) {
    console.error("Error during deletion:", e);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


/** @type {import("express").RequestHandler} */
export const filterItems = async (req, res) => {
  try {
    const filterName = req.body.filter || "ทั้งหมด"; // Default filter

    if (filterName == "ทั้งหมด") {
      return res.status(200).json(items);
    }

    const filteredItems = items.filter(item => item.name === filterName);
    res.status(200).json(filteredItems);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
}