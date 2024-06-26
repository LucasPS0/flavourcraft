
const Recipe = require('../models/recipeModel');
//import all from chatgptservice
const ChatGPTService = require('../services/chatgptService');
const { generateRecipe } = require('../services/chatgptService')

// Create a recipe
exports.addRecipe = async (req, res) => {
  const { ingredients, dietaryPreferences } = req.body;

  try {
    const { title, instructions } = await ChatGPTService.generateRecipe(ingredients, dietaryPreferences); // Use the function

    const newRecipe = new Recipe({
      title,
      instructions,
      ingredients,
      dietaryPreferences,
    });

    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    console.error('Error saving recipe:', error);
    res.status(500).json({ error: 'Failed to save recipe' });
  }
};

// Get recipe recommendations
exports.getRecipes = async (req, res) => {
  const { ingredients, dietaryPreferences } = req.body;
  try {
    const recipes = await ChatGPTService.getRecipeSuggestions(ingredients, dietaryPreferences);
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message + ' ' + error.response.data.error.message });
  }
};

// Test endpoint
exports.test = (req, res) => {
  res.status(200).send('Test successful');
};


exports.addRecipe = async (req, res) => {
    const { ingredients, dietaryPreferences } = req.body;
  
    try {
      const { title, instructions } = await generateRecipe(ingredients, dietaryPreferences);
  
      const newRecipe = new Recipe({
        title,
        instructions,
        ingredients,
        dietaryPreferences,
      });
  
      await newRecipe.save();
      res.status(201).json(newRecipe);
    } catch (error) {
      console.error('Error saving recipe:', error);
      res.status(500).json({ error: 'Failed to save recipe' });
    }
};

exports.listRecipes = async (req, res) => {
    try {
      const recipes = await Recipe.find();
      res.status(200).json(recipes);
    } catch (error) {
      console.error('Error listing recipes:', error);
      res.status(500).json({ error: 'Failed to list recipes' });
    }
  };
// Create a recipe
/* router.post('/', async (req, res) => {
    const { title, instructions, ingredients, dietaryPreferences } = req.body;
  
    try {
      const newRecipe = new Recipe({
        title,
        instructions,
        ingredients,
        dietaryPreferences,
      });
  
      await newRecipe.save();
      res.status(201).json(newRecipe);
    } catch (error) {
      console.error('Error saving recipe:', error);
      res.status(500).json({ error: 'Failed to save recipe' });
    }
  }); */

  /* exports.addRecipe = async (req, res) => {
    const { ingredients, dietaryPreferences } = req.body;
  
    const titleResponse = await axios.post('https://api.openai.com/v1/chat/completions', {
        //prompt: `Generate a title for a recipe that uses these ingredients: ${ingredients.join(', ')}`,
        messages: [{"role": "user", "content": `Generate a title for a recipe that uses these ingredients: ${ingredients.join(', ')}`}],
        max_tokens: 10,
    }, {
        headers: {
            'Authorization': `Bearer ${process.env.CHATGPT_API_KEY}`,
        },
    });

    const instructionsResponse = await axios.post('https://api.openai.com/v1/chat/completions', {
        //prompt: `Generate instructions for a recipe that uses these ingredients: ${ingredients.join(', ')}`,
        messages: [{"role": "user", "content": `Generate instructions for a recipe that uses these ingredients: ${ingredients.join(', ')}. Consider the following dietary preferences: ${dietaryPreferences.join(', ')}`}],
        max_tokens: 150,
    }, {
        headers: {
            'Authorization': `Bearer ${process.env.CHATGPT_API_KEY}`,
        },
    });

    const title = titleResponse.data.choices[0].text.trim();
    const instructions = instructionsResponse.data.choices[0].text.trim();

    try {
      const newRecipe = new Recipe({
        title,
        instructions,
        ingredients,
        dietaryPreferences,
      });
  
      await newRecipe.save();
      res.status(201).json(newRecipe);
    } catch (error) {
      console.error('Error saving recipe:', error);
      res.status(500).json({ error: 'Failed to save recipe' });
    }
  }; */

  //test add on insominia
// POST http://localhost:5000/api/recipes/create
// Content-Type: application/json
// {
//   "title": "Chicken and Rice",
//   "instructions": "Cook the chicken and rice, then mix together with broccoli.",


//twst with insomnia
// {
//   "ingredients": ["chicken", "rice", "broccoli"],
//   "dietaryPreferences": ["gluten-free", "dairy-free"]
// }
// {
    