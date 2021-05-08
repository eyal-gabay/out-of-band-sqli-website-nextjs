import Cors from 'cors'

const { Client } = require("pg")
const { exec } = require("child_process")
const fs = require('fs');

// connect to database
const client = new Client({
    user: "postgres",
    host: "localhost",
    database: "nodejs",
    password: "ed",
    port: 5432
})

client.connect()

/////////////////////
// handle database //
/////////////////////

function insertInto(d=undefined){
    // console.log(`INSERT INTO users (email, password) VALUES ('blablabla@blabla.bla';`)
    let query = {text: `INSERT INTO users (email, password) VALUES ('blablabla@blabla.bla', '${d}');`, values: []}
    // let query = {text: `insert into car (id, make, model, price) values (7, 'Mercury', 'Grand Marquis', $1);`, values: ["q"]}
    console.log(query)
    client.query(query, (err, res) => {
        if (err) {
            console.error("i have an error")
            console.error(err)
        }
    })
}

const cors = Cors({
    methods: ['GET', 'HEAD'],
})

function runMiddleware(req, res, fn) {
    res.setHeader("server", "eyal")
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result)
            }

            return resolve(result)
        })
    })
}

async function handler(req, res) {
    await runMiddleware(req, res, cors)

    if (req.query.e){
        insertInto(req.query.e)
        res.json({ message: req.query.e})
    }
    else {
        res.status(666).send("\"e\" cant be undefined")
    }
}

export default handler
