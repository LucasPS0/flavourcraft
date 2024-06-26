const express = require('express');
const recipeController = require('../controllers/recipeController');
const router = express.Router();

router.post('/recommendations', recipeController.getRecipes);
router.get('/list', recipeController.listRecipes);
router.post('/create', recipeController.addRecipe);

module.exports = router;
