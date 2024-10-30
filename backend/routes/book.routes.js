import express from 'express';
import { createBook, getAllBooks, getBookById, updateBook, deleteBook, getUserBooks } from '../controllers/book.controller.js';
import upload from '../utils/multer.js';

const router = express.Router();

let thumbnailUploadr = upload.single('thumbnail')

router.post('/create', (req, res) => {
    thumbnailUploadr(req, res, function (err) {
        if (err) {
            return res.status(400).json({ message: err.message })
        }
        
        createBook(req, res);
    })  
} );          // Create a new book

router.get('/getbook', getAllBooks);           // Get all books
router.get('/getbook/:id', getBookById);        // Get a single book by ID
router.put('/updatebook/:id', updateBook);         // Update a book by ID
router.delete('/delete/:id', deleteBook);      // Delete a book by ID
router.get('/userbooks/:id', getUserBooks);      // Get user books

export default router;
