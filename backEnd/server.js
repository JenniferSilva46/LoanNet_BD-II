require('dotenv').config();
const {
    json
} = require('express');
const express = require('express');
const app = express();
app.use(express.json());
const port = 8080;

const userMongo = require('./src/controller/crud_user_controller');
const book = require('./src/controller/crud_book_controller');
const book_loan = require('./src/controller/book_loan')
app.post('/user', userMongo.createUser);
app.get('/user/', userMongo.getUser);
app.put('/user', userMongo.updateUser);
app.delete('/user/', userMongo.delUser);
app.get('/user/login', userMongo.loginUser);

app.post('/book', book.createdBook);
app.get('/book', book.getBook);
app.put('/book', book.updateBook);
app.delete('/book', book.deleteBook);

app.post('/loan/sender', book_loan.createSender);
app.post('/loan/addressee', book_loan.createAddressee);
app.post('/loan/addLoan', book_loan.addLoan);
app.delete('/loan/delete', book_loan.deleteMatch);
app.listen(port, () => console.log(port));