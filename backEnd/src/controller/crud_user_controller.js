const {
    clientMongo
} = require('../database/mongo');

const jwt = require('jsonwebtoken');

SECRET = process.env.SECRET;
const createUser = async (req, res) => {
    const userObj = {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        andress: req.body.andress,
        city: req.body.city,
        phone: req.body.phone
    }
    try {
        const users = clientMongo.db(`${process.env.MONGO_DATABASE}`).collection('user');
        await users.insertOne(userObj).then(() => {
            res.send('success');
        }).catch((err) => {
            res.send(err);
        });
    } catch (err) {
        res.send(err);
    }
};


const getUser = async (req, res) => {
    //Verificando se o token do usuário é valido 
    const token = req.headers['x-access-token'];

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) return res.status(401).json({
            message: 'Token inválido'
        }).end;

        req.userId = decoded.userId;
    })
    try {
        const users = clientMongo.db(`${process.env.MONGO_DATABASE}`).collection('user');
        const filter = {
            email: req.body.email
        };
        const user = []
        await users.find(filter).forEach(obj => user.push(obj));

        if (user.length > 0) {
            res.send(user);
        } else {
            res.send('User does not exist!');
        }

    } catch (err) {
        res.send(err)
    }
};

const updateUser = async (req, res) => {
    const filter = {
        email: req.body.email
    };
    try {
        const blog = clientMongo.db(`${process.env.MONGO_DATABASE}`).collection('user');
        const newObj = {
            $set: {
                email: req.body.email,
                name: req.body.name,
                password: req.body.password,
                andress: req.body.andress,
                city: req.body.city,
                phone: req.body.phone
            }

        };
        await blog.updateOne(filter, newObj, (err, obj) => {
            if (obj.modifiedCount > 0) {
                res.send('User updated successfully!');
            } else {
                res.send('User does not exist!');
            }
        })

    } catch (err) {
        res.send("err");
    };
};

const delUser = async (req, res) => {
    try {
        const Users = clientMongo.db(`${process.env.MONGO_DATABASE}`).collection('user');
        const filter = {
            email: req.body.email
        };
        await Users.deleteOne(filter, (err, obj) => {
            if (obj.deletedCount) {
                res.send('User delete successfully!');
            } else {
                res.send('User does not exist!');
            }
        });
    } catch (err) {
        res.send("err")
    };
};

const loginUser = async (req, res) => {

    try {
        const users = clientMongo.db(`${process.env.MONGO_DATABASE}`).collection('user');
        const filter = {
            email: req.body.email,
            password: req.body.password
        };
        const user = []
        await users.find(filter).forEach(obj => user.push(obj));
        if (user.length > 0) {
            // Gerando token de login por 4 horas
            const token = jwt.sign({
                userId: filter.email
            }, SECRET, {
                expiresIn: 14400
            })
            return res.json({
                auth: true,
                token
            })
        } else {
            res.send('User does not exist or password incorrect!');
        }

    } catch (err) {
        res.send(err)
    }
};

module.exports = {
    createUser,
    getUser,
    updateUser,
    delUser,
    loginUser,
};