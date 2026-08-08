import { pool } from "../config/db.js";

export async function addUrl(url: string, shortCode: string) {
    const result = await pool.query(
        `INSERT INTO urls (original_url, short_code) VALUES ($1, $2) RETURNING *`,
        [url, shortCode]
    );
    return result.rows[0];
}

export async function findByCode(shortCode: string) {
    const result = await pool.query(
        `SELECT * FROM urls WHERE short_code = $1`,
        [shortCode]
    );
    return result.rows[0];
}

export async function findByOriginalUrl(originalUrl: string) {
    const result = await pool.query(
        `SELECT * FROM urls WHERE original_url = $1`,
        [originalUrl]
    );
    return result.rows[0];
}