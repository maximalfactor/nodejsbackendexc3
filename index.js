
const express = require("express");
const mysql = require("mysql2/promise");
const config = require("./config.js");


const port = 3001;
const app = express()

app.get("/", async function (req, res) {
    try {
        const connection = await mysql.createConnection(config.db);
        const result = await connection.execute("select * from item");
        if(!result) {
            throw {message: "unable to fetch data from database"}
        }

        res.status(200).json(result[0]);
    }
    catch(err) {
        res.status(500).json({error: err.message})
    }
}
)

app.listen(port);