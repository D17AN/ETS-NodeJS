//Express setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const apiRouter = require('./src/Routes/APIRouter');

const app = express();

app.use(bodyParser.json());

app.use(cors());
app.use('/api', apiRouter);

const PORT = 80;
app.listen(PORT, () => {
    console.log("Server listening on PORT: ", PORT);
});

