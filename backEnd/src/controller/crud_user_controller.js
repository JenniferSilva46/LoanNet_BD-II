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
    console.log(userObj.password);
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
        // console.log(req.userId);

    })
    try {
        const users = clientMongo.db(`${process.env.MONGO_DATABASE}`).collection('user');
        const filter = {
            email: req.body.email
        };
        const user = []
        await users.find().forEach(obj => user.push(obj));

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
                //sessionStorage.setItem('token', token)
                localStorage.setItem('token', token);
                console.log(localStorage.getItem('token'));
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


// const getUserId = async (req, res) =>{

//     try{
//         const users = clientMongo.db(`${process.env.MONGO_DATABASE}`).collection('user');
//         const filter = {
//             email: req.body.email
//         };

//         const user = []
//         await users.find(filter).forEach(obj => user.push(obj));
//         if (user.length > 0) {
//             const teste = user[0]._id
//             console.log(teste.toString())
//             return teste.toString()
//         }
//     } catch (err) {
//         res.send(err);
//     }
// }

// async function getUserId(email) {
//     try {
//         const users = clientMongo.db(`${process.env.MONGO_DATABASE}`).collection('user');
//         const filter = {
//             email: email
//         };

//         const user = []
//         await users.find(filter).forEach(obj => user.push(obj));
//         if (user.length > 0) {
//             const teste = user[0]._id
//             console.log(teste.toString())
//             return teste.toString()
//         }
//     } catch (err) {
//         return err
//     }
// }

module.exports = {
    createUser,
    getUser,
    updateUser,
    delUser,
    loginUser
};