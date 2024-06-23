const express = require('express');
const dotenv = require('dotenv');
require('./connection/conn')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const AdminRouter  = require('./routes/auth');
const StudentRouter = require('./routes/student');
const bookRouter = require('./routes/book');
const Book = require('./models/Book');
const Student = require('./models/Student');
const Admin = require('./models/Admin');

const app = express();
app.use(express.json());
const allowedOrigins = [
    'http://localhost:3000', // Local development
    'https://bookstore-m4ndu4jqq-rohit-kumars-projects-ed18013e.vercel.app' // Vercel deployment
  ];
  
  app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true // If you need to include cookies in the request
  }));
 
app.use(cookieParser());
dotenv.config();

app.use('/auth', AdminRouter);
app.use('/student', StudentRouter);
app.use('/book', bookRouter);

app.get('/dashboard',async (req,res) => {
    try {
        const student = await Student.countDocuments();
        const admin = await Admin.countDocuments();
        const books = await Book.countDocuments();
        return res.json({ok: true, student, books, admin})
    } catch (err) {
        return res.json(err)
    }
})

app.listen(process.env.PORT , () => {
    console.log("Server is started");
})


