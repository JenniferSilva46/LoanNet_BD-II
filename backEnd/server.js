require('dotenv').config();
const cors = require('cors');
const {
    json
} = require('express');
const express = require('express');
const app = express();
app.use(express.json());
app.use(cors());
const port = 8080;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    app.use(cors());
    next();
});

const userMongo = require('./src/controller/crud_user_controller');
const book = require('./src/controller/crud_book_controller');
const book_loan = require('./src/controller/book_loan')
app.post('/user/create', userMongo.createUser);
app.get('/user/getUser', userMongo.getUser);
app.put('/user/update', userMongo.updateUser);
app.delete('/user/deleteUse', userMongo.delUser);
app.post('/user/login', userMongo.loginUser);

app.post('/book', book.createdBook);
app.get('/book', book.getBook);
app.put('/book', book.updateBook);
app.delete('/book', book.deleteBook);

app.post('/loan/sender', book_loan.createSender);
app.post('/loan/addressee', book_loan.createAddressee);
app.post('/loan/addLoan', book_loan.addLoan);
app.delete('/loan/delete', book_loan.deleteMatch);
app.listen(port, () => console.log(port));