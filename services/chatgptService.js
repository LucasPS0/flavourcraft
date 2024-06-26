const axios = require('axios');

exports.getRecipeSuggestions = async (ingredients, dietaryPreferences) => {

  const response = await axios.post('https://api.openai.com/v1/chat/completions', {
    max_tokens: 150,
    messages: [{"role": "user", "content": `Give me a recipe using the following ingredients: ${ingredients.join(', ')}. Consider the following dietary preferences: ${dietaryPreferences.join(', ')}.`}],
    n: 1,
    stop: null,
    temperature: 0.7,
    model: 'gpt-3.5-turbo',
  }, {
    headers: {
      'Authorization': `Bearer ${process.env.CHATGPT_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data.choices[0].message.content;
};

exports.generateRecipe = async (ingredients, dietaryPreferences) => {
  const titleResponse = await axios.post('https://api.openai.com/v1/chat/completions', {
    messages: [{
      role: "user",
      content: `Always give the title in PT-BR/EN Generate a title for a recipe that uses these ingredients: ${ingredients.join(', ')}`
    }],
    max_tokens: 100,
    temperature: 0.7,
    model: 'gpt-3.5-turbo',
  }, {
    headers: {
      'Authorization': `Bearer ${process.env.CHATGPT_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  const instructionsResponse = await axios.post('https://api.openai.com/v1/chat/completions', {
    messages: [{
      role: "user",
      content: `always Answer in pt-br and english/usa, Generate instructions for a recipe that uses only these ingredients that are mentioned: ${ingredients.join(', ')}, try to suggest the most famous recipes, the only things allowed other than that are salt and water. Consider the following dietary preferences: ${dietaryPreferences.join(', ')}`
    }],
    max_tokens: 650,
    temperature: 0.7,
    model: 'gpt-3.5-turbo',
  }, {
    headers: {
      'Authorization': `Bearer ${process.env.CHATGPT_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  const title = titleResponse.data.choices[0].message.content.trim();
  const instructions = instructionsResponse.data.choices[0].message.content.trim();

  return { title, instructions };
};