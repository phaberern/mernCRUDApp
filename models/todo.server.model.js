import mongoose from 'mongoose';

var Schema = mongoose.Schema({
	createdAt: {
		type: Date,
		defaut: Date.now
	},
	fullName: String,
	text: String
});

export default mongoose.model('Todo', Schema);