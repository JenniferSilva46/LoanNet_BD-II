const client = require('../database/postgres');

const jwt = require('jsonwebtoken');
SECRET = process.env.SECRET;

const createdBook = async (request, response) => {
    let id;
    //Verificando se o token do usuário é valido 
    const token = localStorage.getItem('token');
    await jwt.verify(token, SECRET, (err, decoded) => {
        if (err) return response.status(401).json({
            message: 'Token inválido'
        }).end;

        request.userId = decoded.userId;
        id = request.userId;
    })
    // //falta o id_user
    const id_user = id.toString();
    const {
        image,
        title,
        author,
        genre,
        synopsis,
        lat,
        lng,
    } = request.body;
    await client.query(`INSERT INTO book (id_user, image, title, author, genre, synopsis, localization)
    VALUES ('${id_user}', '${image}', '${title}', '${author}', '${genre}', '${synopsis}', ST_GeomFromText('POINT(${lat} ${lng})'))`, (err, results) => {
        if (err) {
            response.status(400).send(err);
            console.log(err);
            return;
        }
        response.status(200).send('Inserido');
    });
}

const getBook = async (request, response) => {

    let id;
    //Verificando se o token do usuário é valido 
    const token = request.headers['x-access-token'];
    await jwt.verify(token, SECRET, (err, decoded) => {
        if (err) return response.status(401).json({
            message: 'Token inválido'
        }).end;

        request.userId = decoded.userId;
        id = request.userId;

    })
    // //falta o id_user

    const id_user = id.toString();

    await client.query('SELECT * FROM Book WHERE id_user = $1',
        [id_user], (err, results) => {

            if (err) {
                response.status(400).send(err);

            } else if (results.rowCount == 0) {
                response.status(200).json({
                    message: "There is no registered book"
                });

            } else {
                response.status(200).json(results.rows);
            }

        });
}
const getAllBook = async (request, response) => {

    await client.query('SELECT * FROM Book',
        (err, results) => {

            if (err) {
                response.status(400).send(err);

            } else if (results.rowCount == 0) {
                response.status(200).json({
                    message: "There is no registered book"
                });

            } else {
                response.status(200).json(results.rows);
            }

        });
}


const updateBook = async (request, response) => {


    let id;
    //Verificando se o token do usuário é valido 
    const token = request.headers['x-access-token'];
    await jwt.verify(token, SECRET, (err, decoded) => {
        if (err) return response.status(401).json({
            message: 'Token inválido'
        }).end;

        request.userId = decoded.userId;
        id = request.userId;

    })
    // //falta o id_user

    const id_user = id.toString();

    const {
        title,
        author,
        genre,
        synopsis
    } = request.body;

    await client.query('UPDATE Book SET title = $1, author = $2, genre = $3, synopsis = $4 WHERE id_user= $5',
        [title, author, genre, synopsis, id_user], (err, results) => {

            if (err) {
                response.status(400).send(err);

            } else if (results.rowCount == 0) {
                response.status(400).send({
                    message: 'The informed does not exist'
                });

            } else {
                response.status(200).send({
                    message: 'Book updated successfully!'
                });
            }

        });
};



const deleteBook = async (request, response) => {


    let id;
    //Verificando se o token do usuário é valido 
    const token = request.headers['x-access-token'];
    await jwt.verify(token, SECRET, (err, decoded) => {
        if (err) return response.status(401).json({
            message: 'Token inválido'
        }).end;

        request.userId = decoded.userId;
        id = request.userId;

    })
    // //falta o id_user

    const id_user = id.toString();
    console.log(id_user);


    await client.query('DELETE FROM Book WHERE id_user = $1', [id_user], (err, results) => {
        if (err) {
            response.status(400).send(err);

        } else if (results.rowCount == 0) {
            response.status(400).send({
                message: 'Book informed does not exist'
            });

        } else {
            response.status(200).send({
                message: 'User deleted!'
            });
        }

    });
}


module.exports = {
    createdBook,
    getBook,
    updateBook,
    deleteBook,
    getAllBook
}