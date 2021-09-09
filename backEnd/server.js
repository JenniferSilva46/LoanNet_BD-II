require('dotenv').config();
const {
    json
} = require('express');
const express = require('express');
const app = express();
app.use(express.json());
const port = 8080;

const userMongo = require('./src/controller/crud_user_controller');
const book =  require('./src/controller/crud_book_controller');

app.post('/user', userMongo.createUser);
app.get('/user/', userMongo.getUser);
app.put('/user', userMongo.updateUser);
app.delete('/user/', userMongo.delUser);
app.get('/user/login', userMongo.loginUser);

app.post('/book', book.createdBook);
app.get('/book', book.getBook);
app.put('/book', book.updateBook);
app.del('/book', book.deleteBook);


app.listen(port, () => console.log(port));