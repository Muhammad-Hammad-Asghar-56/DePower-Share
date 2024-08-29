const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const adRoutes=require("./Routes/Ads")
const userRoutes = require('./Routes/User');
const orderRoute = require('./Routes/Order');
const cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());


app.use(bodyParser.json());
app.use('/ads', adRoutes);
app.use('/users', userRoutes);
app.use('/orders',orderRoute);

mongoose.connect('mongodb://localhost:27017/DePowerShare', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.log('Failed to connect to MongoDB', err);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
