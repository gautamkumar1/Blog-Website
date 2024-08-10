require('dotenv').config();
const express = require('express');
const connectDb = require('./database/dB');
const userRoute = require('./routes/UserRoutes');
const adminRoute = require('./routes/AdminRoutes');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorMiddleware = require('./middlewares/error-middleware');
const app = express();


const corsOptions = {
  
  origin: "*",
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/user', userRoute);
app.use('/api/admin', adminRoute);

app.use(errorMiddleware);


const PORT = process.env.PORT || 3000;


connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
