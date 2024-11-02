// Library
const express = require('express');
const mysql = require('mysql');
const BodyParser = require('body-parser');

const app = express();

// Template Engine
app.set("view engine", "ejs");
app.set("views", "view");

// untuk nangkap form hasil input (post)
app.use(BodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: 'localhost',
    database: 'school',
    user: "root",
    password: "",
});


// Untuk connection to DB
db.connect((err) => {
    if(err) throw err;

    console.log("database connected...");

    // Untuk get data
    app.get("/", (req, res) => {
        const sql = "SELECT * FROM user"
        //untuk eksekusi query SELECT * FROM
        db.query(sql, (err, result) => {
            const users = JSON.parse(JSON.stringify(result));
            res.render("index", {users: users, title: "Daftar Murid Kelas 1 SMA"});
        })
    })

    // untuk create data (post data)
    app.post("/tambah", (req, res) => {
        const insertSql = `INSERT INTO user  (nama, kelas) VALUES ('${req.body.nama}', '${req.body.kelas}');`
        db.query(insertSql, (err, result) => {
            if (err) throw err
            res.redirect("/")
        }) 
    })
    
})


app.listen(8000, () => {

    console.log("Server ready...");

});
