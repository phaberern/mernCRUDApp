//dependencies
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import bb from 'express-busboy';
import SourceMapSupport from 'source-map-support';

//import our routes
import todoRoutes from './routes/todo.server.route';

//define app
const app = express();

//express-busboy to parse multipart/form-data
bb.extend(app);

//allow cors
app.use(function(req, res, next){
	res.header('Allow-Control-Allow-Origin', '*');
	res.header('Allow-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

//configure app
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

//set port
const port = process.env.PORT || 8080;

//database connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/mern-todo-app', { useMongoClient : true,});

//source map support for easier logging
SourceMapSupport.install();

app.use('/api', todoRoutes);

app.get('/', (req, res) => {
	return res.end('API working');
});

//catch 404
app.use((req, res, next) => {
	res.status(404).send('<h2 align=center>Page Not Found!</h2>');
});

app.listen(port, ()=>{
	console.log(`App is listening on port ${port}`);
})