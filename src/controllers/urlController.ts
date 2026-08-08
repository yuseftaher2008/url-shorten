import type { Request, Response } from "express";
import { nanoid } from 'nanoid';
import { addUrl, findByCode } from "../models/urlModels.js";

export async function createShortenUrl(req: Request, res: Response) {
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ message: 'url is required' });
    }

    try {
        const shortCode: string = nanoid(6);
        const newUrl = await addUrl(url, shortCode);
        return res.status(201).json({ shortUrl: `http://localhost:${process.env.PORT || 3000}/${newUrl.short_code}` });
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