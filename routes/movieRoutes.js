const express = require("express")
const Movie = require("../models/movieModel")
const router = express.Router()

router.get("/movies/:id", async(req,res)=>{
    const movie = await Movie.findById(req.params.id);
    res.render("product/product.ejs", {movie: movie})
})

router.get("/movies/:id/edit", async(req,res)=>{
    const movie = await Movie.findById(req.params.id);
    res.render("product/update.ejs",{ movie: movie })
})

router.put("/movies/:id", async(req,res)=>{
    const {id }  =req.params
    const movie = await Movie.findByIdAndUpdate(id, req.body, {runValidators: true});
    res.redirect("/")
})

router.delete("/movies/:id", async(req, res)=>{
    const movie = await Movie.findByIdAndDelete(req.params.id)
    res.redirect("/")
})

module.exports = router