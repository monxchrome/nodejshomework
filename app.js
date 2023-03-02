const fs = require('fs');
const path = require('path');
const express = require('express');
const users = require('./main/db.js')

const app = express();
const PORT = 5100;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(5100, () => {
    console.log(`Server has started on port: ${PORT}`)
});

fs.mkdir(path.join('main'), (err) => {
    if (err) throw new Error(err.message);
})

// Винести базу даних в json.file, при створенні записувати туда нових юзерів через fs
// При створенні валідацію на імія і вік, імя повинно бути більше 2 символів, вік – не менше нуля
// На гет, пут, деліт юзерів перевірити чи такий юзер є

fs.writeFile(path.join('main', 'db.js'), '', (err) => {
    if (err) throw new Error(err.message);
})

app.get('/users', (req, res) => {
    res.status(200).json(users);
});

app.get('/users/:userID', (req, res) => {
    const { userID } = req.params;

    if (+userID > users.users.length) {
        res.status(404).json({
            message: 'Not found'
        })
    } else {
        const user = users.users[+userID];
        res.status(200).json(user)
    }
});

app.post('/users', (req, res) => {
    const body = req.body
    if (body.name.length > 2 && body.age >= 0) {
        users.users.push(body)
        res.status(200).json({
            message: 'User Created.'
        })
    } else {
        res.status(418).json({
            message: 'ERROR! User name must be > 2 and User age must be >= 0'
        })
    }
})

app.put('/users/:userID', (req, res) => {
    const { userID } = req.params;
    const updatedUser = req.body;

    if (+userID > users.users.length) {
        res.status(404).json({
            message: 'Not found'
        })
    } else {
        users.users[+userID] = updatedUser;
        res.status(200).json({
            message: 'User is updated',
            data: users.users[+userID]
        })
    }
})

app.delete('/users/:userID', (req, res) =>  {
    const { userID } = req.params;

    if (+userID > users.users.length) {
        res.status(404).json({
            message: 'Not found'
        })
    } else {
        users.users.splice(+userID, 1);
        res.status(200).json({
            message: 'User has been deleted.'
        })
    }
})