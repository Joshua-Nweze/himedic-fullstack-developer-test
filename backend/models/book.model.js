// models/Book.js
import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
	user: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: [true, 'Title is required and cannot be empty.']
	},
	author: {
		type: String,
		required: [true, 'Author name is required.']
	},
	genre: {
		type: String,
		required: [true, 'Genre is required.']
	},
	publishedDate: {
		type: String,
		required: [true, 'Published date is required.']
	},
	thumbnail: {
		type: String,
		required: [true, 'Thumbnail is required.']
	},
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);
export default Book;
