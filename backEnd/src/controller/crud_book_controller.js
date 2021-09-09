const pool = require('../database/postgres');

const createdBook = async (request, response) => {
    
    const {id_user, title, author, genre, synopsis} = request.body;

    await pool.query('INSERT INTO Book (id_user, title, author, genre, synopsis) VALUES ($1, $2, $3, $4, $5 )', 
        [id_user, title, author, genre, synopsis], (err, results) => {
        if (err) {
            if (err.detail) {
                response.status(400).send({ message: "Already Exists" });
                return
            }
            response.status(400).send(err);
        }
        response.status(201).send({
            message: "Book added successfully!",
            body: {
                user: { id_user, title, author, genre, synopsis }
            },
        });
    });
}



const getBook = async (request, response) => {

    const id_user = request.body.id_user;

    await pool.query('SELECT * FROM Book WHERE id_user = $1',
        [ id_user ], (err, results) => {
        
        if (err) {
            response.status(400).send(err);

        } else if (results.rowCount== 0) {
            response.status(200).json({message: "There is no registered book"});

        } else {
            response.status(200).json(results.rows);
        }

    });
}


const updateBook = async (request, response) => {

    const {title, author, genre, synopsis, id_user} = request.body;

     await pool.query('UPDATE Book SET title = $1, author = $2, genre = $3, synopsis = $4 WHERE id_user= $5', 
        [title, author, genre, synopsis, id_user], (err, results) => {

        if (err) {
            response.status(400).send(err);

        } else if (results.rowCount == 0) {
            response.status(400).send({ message: 'The informed does not exist' });

        } else {
            response.status(200).send({ message: 'Book updated successfully!' });
        }

    });
};



const deleteBook = async (request, response) => {
   
    const id_user = request.body.id_user;

    await pool.query('DELETE FROM Book WHERE id_user = $1', [id_user], (err, results) => {
        if (err) {
            response.status(400).send(err);

        } else if (results.rowCount == 0) {
            response.status(400).send({ message: 'Book informed does not exist' });

        } else {
            response.status(200).send({ message: 'User deleted!' });
        }

    });
}


module.exports = {
    createdBook,
    getBook,
    updateBook,
    deleteBook
}