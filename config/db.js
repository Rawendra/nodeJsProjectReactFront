const mongoose = require('mongoose');
//const config = require('config');
const db = require('./keys').mongoURI;
console.log('displaying the mongURI...')
console.log(db)
const connectDB = async () => {
	try {
    //mongoose is used to connect the 
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true
		});

		console.log('MongoDB Connected...');
	} catch (err) {
		console.error(err.message);
		// Exit process with failure
		process.exit(1);
	}
};

module.exports = connectDB;