const express=require("express");
const multer = require('multer');
const mysql=require('mysql');
const cors=require('cors');
const cookieParser=require('cookie-parser');
const session =require('express-session');
const bodyParser=require('body-parser');
const path =require('path');
const fs = require('fs');
const nodemailer=require('nodemailer');
const dotenv=require('dotenv')
dotenv.config();

const app=express();


let transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
        user: process.env.EM_USER,
        pass: process.env.EM_PASS
    }
});



const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/images')
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
    }
})
const upload=multer({
    storage:storage
})
app.use(express.static(path.join(__dirname, 'public')));


app.use(cors({
    origin:["https://food-dist-platform.vercel.app"],
    exposedHeaders: 'Set-Cookie',
    methods:["POST","GET","DELETE"],
    credentials:true

}));


app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized:false,
    cookie:{
        secure:false,
        maxAge:1000*60*60*24
    }
}))
app.use(express.json());
app.use(cookieParser());
const db=mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:"food",
    ssl: {ca: fs.readFileSync("file/DigiCertGlobalRootCA.crt.pem")}
})

db.connect((err) => {
    if (err) {
      console.error('MySQL connection error:', err);
    } else {
      console.log('Connected to MySQL database');
    }
  });


app.get('/View',(req,res)=>{
    console.log(req.session.role);
    if(req.session.role==='Buyer'){
        return res.json({valid:true,role:req.session.role})
    }else{
        return res.json({valid:false})
    }
})

app.get('/Admin',(req,res)=>{
    if(req.session.role==='Admin'){
        return res.json({valid:true,role:req.session.role})
    }else{
        return res.json({valid:false})
    }
})

app.get('/Add',(req,res)=>{
    if(req.session.role==='Donor'){
        return res.json({valid:true,role:req.session.role})
    }else{
        return res.json({valid:false})
    }
})


app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            res.json({ logout: false, error: 'Error during logout' });
        } else {
            res.clearCookie('connect.sid'); // Clear the session cookie
            res.json({ logout: true });
        }
    });
});


// Add this endpoint to your existing server-side code

app.get('/getData', (req, res) => {
    if (req.session.role === 'Donor') {
        // Assuming 'email' is the column in your database that stores user emails
        const userEmail = req.session.email;
        
        // Fetch data from food_details table
        const fetchDataSql = "SELECT * FROM food_details WHERE email = ?";
        db.query(fetchDataSql, [userEmail], (err, data) => {
            if (err) {
                console.error(err);
                res.json({ success: false, error: 'Error fetching data' });
            } else {
                
                res.json({ success: true, data: data });
            }
        });
    } else {
        res.json({ success: false, error: 'Unauthorized access' });
    }
});



app.get('/fetchata', (req, res) => {
    if (req.session.role === 'Buyer' || req.session.role === 'Admin') {
        console.log('Session data:', req.session);
        const fetchDataSql = "SELECT * FROM food_details";
        db.query(fetchDataSql, (err, data) => {
            if (err) {
                console.error(err);
                res.json({ success: false, error: 'Error fetching data' });
            } else {
                
                res.json({ success: true, data: data });
            }
        });
    } else {
        res.json({ success: false, error: req.session || 'No role set in session' });
    }
});





app.post('/login',(req,res)=>{
    const sql="SELECT * FROM login WHERE `email` =? AND `password` =?";

    db.query(sql,[req.body.email,req.body.password],(err,data)=>{
        if(err){
            return res.json("Error");
        }
        if (data.length>0){
            const { email, role } = data[0];
            req.session.email = email;
            req.session.role = role;
            return res.json({ login: true, role:req.session.role, session : req.session });
        }else{
            return res.json({login:false});
        }
    })
})

app.post('/signup',(req,res)=>{
    const sql="INSERT INTO login(`role`,`email`,`password`) VALUES (?)";
    const values=[
        req.body.role,
        req.body.email,
        req.body.password
    ]
    db.query(sql,[values],(err,data)=>{
        if(err){
            return res.json("Error");
        }
        return res.json(data);
    })
})


app.post('/Add', upload.single('image'), (req, res, next) => {
    const sql = "INSERT INTO food_details (`foodname`, `image`, `donor`, `email`, `quantity`, `condition`, `foodtype`, `contact`, `location`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
        req.body.foodname,
        req.file.filename, // Use req.file.buffer to access the uploaded file data
        req.body.donor,
        req.body.email,
        req.body.quantity,
        req.body.condition,
        req.body.foodtype,
        req.body.contact,
        req.body.location
    ];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.log(err);
            return res.json({ success: false, error: 'Error inserting data into food_details' });
        }
        console.log("Data inserted into food_details successfully");
        return res.json({ success: true });
    });
});



app.delete('/Delete/:foodName', (req, res) => {
    if (req.session.role === 'Donor' ) {
        const userEmail = req.session.email;
        const foodName = req.params.foodName;

        // Assuming 'foodname' is the column in your database that stores food names
        const sql = "DELETE FROM food_details WHERE email = ? AND foodname = ?";
        db.query(sql, [userEmail, foodName], (err, data) => {
            if (err) {
                console.error(err);
                res.json({ success: false, error: 'Error deleting data' });
            } else {
                res.json({ success: true, message: 'Item deleted successfully' });
            }
        });
    } else {
        res.json({ success: false, error: 'Unauthorized access' });
    }
});


app.delete('/Buy/:foodName', (req, res) => {
    const options = {
        from: 'navihema2112@outlook.com', // Sender address
        to: req.session.email, // List of recipients
        subject: 'Purchase Successful', // Subject line
        text: 'Thank You for your order!! Do visit us again..' // Plain text body
    };
    
    
    if (req.session.role === 'Buyer' || req.session.role === 'Admin') {

        const foodName = req.params.foodName;
        const buyerEmail = req.query.email;

        // Assuming 'foodname' is the column in your database that stores food names
        const sql = "DELETE FROM food_details WHERE foodname = ? AND email = ?";
        

        db.query(sql, [foodName, buyerEmail], (err, data) => {
            if (err) {
                console.error(err);
                res.json({ success: false, error: 'Error deleting data' });
            } else {
                res.json({ success: true, message: 'Item deleted successfully' });
                transporter.sendMail(options, (error, info) => {
                    if (error) {
                        console.log('Error occurred:', error.message);
                        return;
                    }
                    console.log('Email sent successfully!');
                });
                
                
            }
        });
    } else {
        res.json({ success: false, error: 'Unauthorized access' });
    }
});


app.listen(8081,()=>{
    console.log("listening");
})
