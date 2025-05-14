// database.js
import * as SQLite from 'expo-sqlite';

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
export const fetchMenuItemsByCategory = async (categories) => {
  if (!db) {
    await initDatabase();
  }

  if (!categories.length) {
    // Return all items if no category selected
    return await db.getAllAsync(`SELECT * FROM menu`);
  }

  const placeholders = categories.map(() => '?').join(',');
  const query = `SELECT * FROM menu WHERE category IN (${placeholders})`;
  return await db.getAllAsync(query, categories);
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


