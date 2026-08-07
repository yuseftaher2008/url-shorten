import { pool } from "./config/db.js";

export async function createTable() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS urls (
                id SERIAL PRIMARY KEY,
                original_url TEXT NOT NULL,
                short_code VARCHAR(6) NOT NULL UNIQUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log("urls table created successfully");
    } catch (error) {
        console.error("Error creating urls table:", error);
        throw error;
    } finally {
        await pool.end();
    }
}

createTable();
