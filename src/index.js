const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { startDatabase } = require('./database/mongo');
const {insertNewToken, getNewToken, updateToken, deleteToken} = require('./database/initiateAutonomy');

const app = express();

app.use(helmet());

app.use(bodyParser.json());

app.use(cors());

app.use(morgan('combined'));

app.get('/', async (req,res) => {
    res.send(await getNewToken());
});

app.post('/', async (req, res) => {
    const newToken = req.body;
    await insertNewToken(newToken);
    res.send({message: 'new Token created'});
})

app.delete('/:id', async (req, res) => {
    await deleteToken(req.params.id);
    res.send({message: 'Token removed'});
})

app.put('/:id', async (req, res) => {
    const updateTk = req.body;
    await updateToken(req.params.id, updateTk);
    res.send({message: 'Token Updated'})
})

startDatabase().then(async () => {
    await insertNewToken({title: 'Hello, from in-memory Autonomy DB'});
    
    app.listen(3001, async () => {
        console.log('listening on port 3001')
    });
});

