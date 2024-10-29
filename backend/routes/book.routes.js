import express from 'express';
import { createBook, getAllBooks, getBookById, updateBook, deleteBook } from '../controllers/book.controller.js';

const router = express.Router();

router.post('/create', createBook);          // Create a new book
router.get('/getbook', getAllBooks);           // Get all books
router.get('/getbook/:id', getBookById);        // Get a single book by ID
router.put('/updatebook/:id', updateBook);         // Update a book by ID
router.delete('/delete/:id', deleteBook);      // Delete a book by ID

export default router;
