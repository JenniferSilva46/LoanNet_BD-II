const {
    clientMongo
} = require('../database/mongo');

const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');
SECRET = process.env.SECRET;

if (typeof localStorage === "undefined" || localStorage === null) {
    const LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

const gerarHash = async (password) => {
    return await bcryptjs.hashSync(password, 10);
}

const createUser = async (req, res) => {
    const userObj = {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        phone: req.body.phone
    }
    userObj.password = await gerarHash(userObj.password);
    try {
        const users = clientMongo.db(`${process.env.MONGO_DATABASE}`).collection('user');
        await users.insertOne(userObj).then(() => {
            res.send("success")
        }).catch((err) => {
            res.send(err);
        });
    } catch (err) {
        res.send(err);
    }
};

const getUser = async (req, res) => {
    try {
        const users = clientMongo.db(`${process.env.MONGO_DATABASE}`).collection('user');
        const filter = {
            email: req.params.email
        };
        const user = []
        await users.find(filter).forEach(obj => user.push(obj));
        user[0].password = undefined;
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

        };
        const password = {
            password: req.body.password
        }

        const user = []
        await users.find(filter).forEach(obj => user.push(obj));

        if (user.length > 0) {
            if (bcryptjs.compareSync(password.password, user[0].password)) {
                // Gerando token de login por 4 horas
                const token = jwt.sign({
                    userId: user[0]._id
                }, SECRET, {
                    expiresIn: 14400
                })
                localStorage.setItem('token', token);
                return res.json({
                    auth: true,
                    email: filter.email,
                    token
                })
            }

        } else {
            res.json('User does not exist or password incorrect!');
        }

    } catch (err) {
        res.send("erro")
    }
};


const getUserId = async (req, res) => {
    let id;
    //Verificando se o token do usu??rio ?? valido 
    const token = localStorage.getItem('token');
    await jwt.verify(token, SECRET, (err, decoded) => {
        if (err) return response.status(401).json({
            message: 'Token inv??lido'
        }).end;

        req.userId = decoded.userId;
        id = req.userId;
    })

    const idUser = id.toString();

    try {
        const users = clientMongo.db(`${process.env.MONGO_DATABASE}`).collection('user');
        const filter = {
            _id: idUser
        };
        const user = []
        await users.find().forEach(obj => user.push(obj));

        user.forEach(function (obj, index) {
            if (user[index]._id == filter._id) {
                user[0].password = undefined;
                res.send(user[index]);
            }
        })
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
    getUserId
};