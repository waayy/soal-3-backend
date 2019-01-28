let router = require('express').Router()
let mysql = require('mysql')
let bodyParser = require('body-parser')
let cors = require('cors')
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'sekolahku'
})
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

db.connect(() => {
    console.log('')
})


router.get('/username', (req, res) => {
    let sql = 'select * from users'
    db.query(sql, (err, result) => {
        if (err) throw err
        res.send(result)
    })
})

router.post('/signup', (req, res) => {
    let dataUsers = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }
    db.query('INSERT INTO users SET ?', dataUsers, function (error, result) {
        if (error) {
            console.log("error ocurred", error);
            res.send({
                "failed": "erorrrr"
            })
        } else {

            res.send({
                email: req.body.email,
                username: req.body.username,
                "status": "user registered sucessfully"
            });
        }
    });

})


//login
router.post('/login', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    db.query('SELECT * FROM users WHERE email = ?', email, function (error, results, fields) {
        if (error) {
            res.send({
                "status": "errorrr"
            })
        } else {
            if (results.length > 0) {
                if (results[0].password == password) {
                    console.log(results.password)
                    res.send({
                        results,
                        "success": "login sucessfull"
                    });
                } else {
                    res.send({
                        "success": "Email and password gak nyambung"
                    });
                }
            }
            else {
                res.send({
                    "success": "Email gak ada"
                });
            }
        }
    });
})

module.exports = router