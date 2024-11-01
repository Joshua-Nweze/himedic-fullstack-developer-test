import Book from "../models/book.model.js";
import getErrorMsg from "../utils/getErrorMsg.js";
import fs from 'fs'

async function createBook(req, res) {
    try {
        const newBook = new Book(req.body);

        if (req.file) {
            let thumbnailPath = req.file.path

            const imageBuffer = fs.readFileSync(thumbnailPath);
            // Encode the image buffer as a Base64 string
            const imageBase64 = imageBuffer.toString('base64');

            newBook.thumbnail = imageBase64;
        }       
        
        const savedBook = await newBook.save();
        res.status(201).json({ msg: 'Book created successfully'});
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({ msg: getErrorMsg(error.errors) });
        } else {
            res.status(500).json({ msg: "Something went wrong, try again later." });
        }
    }
};

async function getAllBooks(req, res) {
    try {
        const books = await Book.find();
        res.json({ msg: books });
    } catch (error) {
        res.status(500).json({ msg: "Something went wrong, try again later."  });
    }
};

async function getBookById(req, res) {
    try {
        const book = await Book.findById(req.params.id);
        if (book) {
            res.json({ msg: book });
        } else {
            res.status(404).json({ msg: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ msg: "Something went wrong, try again later." });
    }
};

async function updateBook(req, res) {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedBook) {
            res.status(200).json({ msg: "Book updated", updatedBook })
        } else {
            res.status(404).json({ msg: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ msg: "Something went wrong, try again later." });
    }
};

async function deleteBook(req, res) {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (deletedBook) {
            res.status(200).json({ msg: 'Book deleted' });
        } else {
            res.status(404).json({ msg: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ msg: "Something went wrong, try again later." });

    }
};

async function getUserBooks(req, res) {
    try {
        const userBooks = await Book.find({user: req.params.id});
        
        res.status(200).json({ msg: userBooks });
    } catch (error) {
        res.status(500).json({ msg: "Something went wrong, try again later." });

    }
}

export {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook,
    getUserBooks
}