import SQLite from 'react-native-sqlite-storage';

// Open the SQLite database
const db = SQLite.openDatabase(
  { name: 'menu.db', location: 'default' },
  () => {},
  (error) => { console.error(error); }
);

// Function to create a table if it doesn't exist
export const createTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS menu (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, price REAL, image TEXT);`
    );
  });
};

// Function to insert a menu item into the table
export const insertMenuItem = (name, description, price, image) => {
  db.transaction((tx) => {
    tx.executeSql(
      'INSERT INTO menu (name, description, price, image) VALUES (?, ?, ?, ?)',
      [name, description, price, image],
      (tx, results) => {
        console.log('Inserted item with ID:', results.insertId);
      },
      (error) => {
        console.error('Error inserting item:', error);
      }
    );
  });
};

// Function to fetch menu items from the database
export const fetchMenuItems = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM menu',
        [],
        (tx, results) => {
          let items = [];
          for (let i = 0; i < results.rows.length; i++) {
            items.push(results.rows.item(i));
          }
          resolve(items);
        },
        (error) => {
          reject(error);
        }
      );
    });
  });
};
