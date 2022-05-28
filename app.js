const express = require('express')
const bodyParser = require('body-parser')
const {check, validationResult} = require('express-validator')

const app = express()
const port = 5000

//set templating engine
app.set('view engine', 'ejs')


const urlencodedParser = bodyParser.urlencoded({ extended: false })

//Navigation
app.get('', (req, res)=>{
    res.render('index')
})

app.get('/register', (req, res)=>{
    res.render('register')
})

app.post('/register', urlencodedParser, [
    check('username', 'This username must have 3+ character long')
    .exists()
    .isLength({min: 3}),
    check('email', 'email is not valid')
        .isEmail()
        .normalizeEmail(),
    check('password', 'length of password must be 4 - 16 characters')
        .isLength({min:3, max:16}),
    check('password').exists(),
    check(
          'passwordConfirmation',
          'passwordConfirmation field must have the same value as the password field',
        )
          .exists()
          .custom((value, { req }) => value === req.body.password)

], (req, res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        //return res.status(422).json(errors.array())
        const alert = errors.array()
        res.render('register', {
            alert
        })
    }
})

app.listen(port, () => console.info(`App is listening on port http${port}`))



