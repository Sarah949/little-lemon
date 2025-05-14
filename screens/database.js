// database.js
import * as SQLite from 'expo-sqlite';
import { useState, useEffect } from 'react';

let db;

export const initDatabase = async () => {
  db = await SQLite.openDatabaseAsync('little_lemon.db');

  // Drop the old table to avoid schema mismatch (only do this in development!)
  await db.execAsync(`DROP TABLE IF EXISTS menu`);

  // Now create the correct table with the category column
  return db.execAsync(`
    CREATE TABLE IF NOT EXISTS menu (
      id INTEGER PRIMARY KEY NOT NULL,
      name TEXT,
      description TEXT,
      price TEXT,
      image TEXT,
      category TEXT
    );
  `);
};

// Fetch menu items filtered by selected categories
export const fetchMenuItemsByCategoryAndSearch = async (categories, searchQuery) => {
  if (!db) {
    await initDatabase();
  }

  let query = `SELECT * FROM menu WHERE name LIKE ?`; // Base query to filter by dish name
  const params = [`%${searchQuery}%`]; // Params for the name filter

  if (categories.length > 0) {
    // Add category filter if selected categories are available
    const placeholders = categories.map(() => '?').join(',');
    query += ` AND category IN (${placeholders})`;
    params.push(...categories); // Append the selected categories
  }

  try {
    const result = await db.getAllAsync(query, params);
    return result;
  } catch (error) {
    console.error('Database error:', error);
    return [];
  }
};


export const insertMenuItems = async (menuItems) => {
  if (!db) {
    await initDatabase();
  }
  for (const item of menuItems) {
    await db.runAsync(
  `INSERT INTO menu (name, description, price, image, category) VALUES (?, ?, ?, ?, ?)`,
  [item.name, item.description, item.price, item.image, item.category]
);

  }
};

export const fetchMenuItems = async () => {
  if (!db) {
    await initDatabase();
  }
  const result = await db.getAllAsync(`SELECT * FROM menu`);
  return result;
};


