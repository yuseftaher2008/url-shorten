import express from 'express';
import type { Router } from 'express';
import { createShortenUrl, redirectUrl } from '../controllers/urlController.js';

export const urlRouter: Router = express.Router();

urlRouter.post('/shorten', createShortenUrl);
urlRouter.get('/:code',redirectUrl);