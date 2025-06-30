import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseAsync("db.db");

export default db;
