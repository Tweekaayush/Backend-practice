const Movie = require("Movie")

exports.addMovie = async(req, res, next) =>{
    const movie = await Movie.create(req.body);
    res.status(201).json({
        success: true,
        movie
    })
}