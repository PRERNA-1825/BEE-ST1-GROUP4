const express = require('express');
const router = express.Router({ mergeParams: true }); // mergeParams allows access to params from parent router
const reviewController = require('../controllers/reviewController');


router.post('/', reviewController.addReview);
router.get('/', reviewController.getAllReviews);
router.put('/:reviewId', reviewController.updateReview);
router.delete('/:reviewId', reviewController.deleteReview);

module.exports = router;
