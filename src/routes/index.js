// src/routes/index.js

import express from 'express';
import moviesRouter from './movies.js';

const router = express.Router();

router.get('/health-check', (req, res) => {
    res.json({message: "All is well!"});
});

// Other routes could be added here in a similar fashion
router.use('/movies', moviesRouter);

export default router;
