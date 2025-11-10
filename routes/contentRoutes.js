const express = require('express');
const { createContent, getContents, getContentById, updateContent, deleteContent } = require('../controllers/contentController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/contents', authMiddleware, createContent);
router.get('/contents', authMiddleware, getContents);
router.get('/contents/:id', authMiddleware, getContentById);
router.put('/contents/:id', authMiddleware, updateContent);
router.delete('/contents/:id', authMiddleware, deleteContent);

module.exports = router;