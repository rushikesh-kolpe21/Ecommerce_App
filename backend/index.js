const express = require('express');

const cors = require('cors');
require('dotenv/config');


// database connection (directly importing to establish connection)
require('./models/connectionDb');

// cloudinary configuration
const connectCloudinary = require('./config/cloudinary');
connectCloudinary();


// app configuration
const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});



// middleware
app.use(express.json()); // data ko read/parse
app.use(cors()); // // Enable CORS so frontend (different origin) can access backend APIs

// order routes
const orderRouter = require('./routes/orderRoute');
// Mount without trailing spaces to avoid 404s
app.use('/api/order', orderRouter);

 // cart routes 
const cartRouter = require('./routes/cartRoute');
app.use('/api/cart', cartRouter);


// product routes
const produtRouter = require('./routes/productRoute');
app.use('/api/products', produtRouter);  


// user routes
const userRouter = require('./routes/userRouter');
app.use('/api/user', userRouter);

// start server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
