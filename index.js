const express = require('express');
const cors = require('cors');
const dotevn = require('dotenv');
const connectToDatabase = require('./config/mongodb');
const Auth = require('./routes/Auth.js');
const Product = require('./routes/post.js');

dotevn.config();

const app = express();

app.use(cors());

app.use(express.static('public'))
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));

app.use('/', Auth);

app.use('/', Product);
connectToDatabase();


app.get('/', (req, res) => {
    res.json({message:'hello '})
})


const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log('Server listening on port ' + PORT)
})