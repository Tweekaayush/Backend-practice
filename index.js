const express = require("express")
const dotenv = require("dotenv")
const connectDatabase = require("./config/database")
const Movie = require("./models/movieModel")
const methodOverride = require("method-override")


const app = express();
const port = 4000

dotenv.config({path:"config/config.env"});
app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))

connectDatabase();

const addMovie = async(req,res) => {
    const movie = await Movie.create(req);
}
// const getAllMovies = async(req,res) => {
    
//     return movies
// }

app.get("/", async(req,res)=>{
    const movies = await Movie.find(req.query);
    res.render("home/index.ejs", {movies: movies})
})

// app.get("/movies", async(req,res)=>{
//     const movies = await Movie.find(req.query);
//     res.render("home/index.ejs", {movies: movies})
// })


app.get("/movies/:id", async(req,res)=>{
    const movie = await Movie.findById(req.params.id);
    res.render("product/product.ejs", {movie: movie})
})

app.get("/movies/:id/edit", async(req,res)=>{
    const movie = await Movie.findById(req.params.id);
    res.render("product/update.ejs",{ movie: movie })
})

app.put("/movies/:id", async(req,res)=>{
    const {id }  =req.params
    const movie = await Movie.findByIdAndUpdate(id, req.body, {runValidators: true});
    res.redirect("/")
})

app.delete("/movies/:id", async(req, res)=>{
    const movie = await Movie.findByIdAndDelete(req.params.id)
    res.redirect("/")
})

app.post("/submit", (req, res)=>{
    addMovie(req.body)
    res.redirect("/")
})

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})