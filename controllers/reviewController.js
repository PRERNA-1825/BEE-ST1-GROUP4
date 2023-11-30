const Movie = require('../models/movie');

// Add 
const addReview = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.movieId);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    const review = req.body;
    movie.reviews.push(review);
    await movie.save();

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//  pagination
const getAllReviews = async (req, res) => {
  try {
    const { page = 1, pageSize = 10 } = req.query;
    const movie = await Movie.findById(req.params.movieId);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    const reviews = movie.reviews
      .slice((page - 1) * pageSize, page * pageSize);

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update 
const updateReview = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.movieId);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    const review = movie.reviews.id(req.params.reviewId);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    review.set(req.body);
    await movie.save();

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete 
const deleteReview = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.movieId);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    const review = movie.reviews.id(req.params.reviewId);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    review.remove();
    await movie.save();

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  addReview,
  getAllReviews,
  updateReview,
  deleteReview,
};
