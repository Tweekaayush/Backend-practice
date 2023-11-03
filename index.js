const express = require("express")
const dotenv = require("dotenv")
const connectDatabase = require("./config/database")
const Movie = require("./models/movieModel")
const methodOverride = require("method-override")
const AppError = require("./utils/AppError")
const catchAsyncErrors= require("./middleware/catchAsyncErrors")
const movies = require("./routes/movieRoutes")
const  session = require("express-session")


const app = express();
const port = 4000
const sessionOptions = {secret: `This is a secret`, resave: false, saveUninitialized: false}

//middleware

dotenv.config({path:"config/config.env"});
app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))
app.use(session(sessionOptions))

//connecting database

connectDatabase();

// routes

app.use("/", movies)

//default routes

app.get("/", async(req, res, next)=>{
    if(req.session.count)
        req.session.count += 1
    else req.session.count = 1

    const count = req.session.count
    res.cookie('fruit', "apple")
    const movies = await Movie.find(req.query);
    res.render("home/index.ejs", {movies: movies, count: count})
})

app.post("/submit", catchAsyncErrors(async(req, res, next)=>{
    const movie = await Movie.create(req.body);
    res.redirect("/")
}))

app.get('/admin', (req, res, next)=>{
    return next(new AppError('You are not an Admin', 403))
})


// Not found error middleware

app.use((err, req, res, next)=>{
    const {status = 500, message="Something went wrong!"} = err
    res.status(status).send(message)
})

//server

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})