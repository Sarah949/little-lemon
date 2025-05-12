// database.js
import * as SQLite from 'expo-sqlite';

let db;

export const initDatabase = async () => {
  db = await SQLite.openDatabaseAsync('little_lemon.db');
  return db.execAsync(`
    CREATE TABLE IF NOT EXISTS menu (
      id INTEGER PRIMARY KEY NOT NULL,
      name TEXT,
      description TEXT,
      price TEXT,
      image TEXT
    );
  `);
};


export const insertMenuItems = async (menuItems) => {
  if (!db) {
    await initDatabase();
  }
  for (const item of menuItems) {
    await db.runAsync(
      `INSERT INTO menu (name, description, price, image) VALUES (?, ?, ?, ?)`,
      [item.name, item.description, item.price, item.image]
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


