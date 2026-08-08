import type { Request, Response } from "express";
import { nanoid } from 'nanoid';
import { addUrl, findByCode, findByOriginalUrl } from "../models/urlModels.js";

export async function createShortenUrl(req: Request, res: Response) {
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ message: 'url is required' });
    }

    try {
        const parsed = new URL(url);
        if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
            return res.status(400).json({ message: "Invalid URL format" });
        }
    } catch {
        return res.status(400).json({ message: "Invalid URL format" });
    }

    try {
        const existing = await findByOriginalUrl(url);
        if (existing) {
            return res.status(200).json({ shortUrl: `http://localhost:${process.env.PORT || 3000}/api/${existing.short_code}` });
        }

        const shortCode: string = nanoid(6);
        const newUrl = await addUrl(url, shortCode);
        return res.status(201).json({ shortUrl: `http://localhost:${process.env.PORT || 3000}/api/${newUrl.short_code}` });
    } catch (error) {
        console.error("Error creating short URL:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function redirectUrl(req: Request, res: Response) {
    const code = req.params.code as string;

    try {
        const urlRecord = await findByCode(code);
        if (!urlRecord) {
            return res.status(404).json({ message: "Short URL not found" });
        }
        return res.redirect(urlRecord.original_url);
    } catch (error) {
        console.error("Error redirecting:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}