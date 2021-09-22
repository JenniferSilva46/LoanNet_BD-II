const {
    session
} = require('../database/neo4j');

const createSender = async (req, res) => {

    const obj = {
        idUser: req.body.idUser,
        nameUser: req.body.nameUser,
        idBook: req.body.idBook,
        titleBook: req.body.titleBook
    };
    await session.run('CREATE (p:sender{idUser:$idUser, nameUser:$nameUser, idBook:$idBook, titleBook:$titleBook}) RETURN p', {
            idUser: obj.idUser,
            nameUser: obj.nameUser,
            idBook: obj.idBook,
            titleBook: obj.titleBook
        }).then(res.send('User created to success'))
        .catch(error => console.log(error))
        .then(() => {
            session.close
        });
}
const createAddressee = async (req, res) => {

    const obj = {
        idUser: req.body.idUser,
        nameUser: req.body.nameUser,
    };
    await session.run('CREATE (p:addressee{idUser:$idUser, nameUser:$nameUser}) RETURN p', {
            idUser: obj.idUser,
            nameUser: obj.nameUser,
        }).then(console.log(res.send('User created to success')))
        .catch(error => console.log(error))
        .then(() => {
            session.close
        });
}

const addLoan = async (req, res) => {
    const obj = {
        idBook: req.body.idBook,
        idUser: req.body.idUser
    };
    await session.run('MATCH (p1:sender{idBook:$idBook}) MATCH (p2:addressee{idUser:$idUser}) CREATE (p1)-[:LOAN]->(p2)', {
            idBook: obj.idBook,
            idUser: obj.idUser
        }).then(result => {
            if (result.summary.counters._stats.relationshipsCreated > 0) {
                return res.json({
                    loan: true
                });
            } else {
                console.log(res.send("Fail"))
            }
        })
        .catch(error => console.log(error))
        .then(() => {
            session.close
        });
}

const deleteMatch = async (req, res) => {
    const obj = {
        idBook: req.body.idBook,
        idUser: req.body.idUser
    };
    await session.run('MATCH (p1:sender{idBook:$idBook})-[p2]-(p3:addressee{idUser:$idUser}) DELETE p1,p2,p3', {
            idBook: obj.idBook,
            idUser: obj.idUser
        }).then(result => {
            res.send("success");
        })
        .catch(error => console.log(error))
        .then(() => {
            session.close
        });
}

module.exports = {
    createSender,
    createAddressee,
    addLoan,
    deleteMatch
}