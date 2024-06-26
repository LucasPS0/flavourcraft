import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Button, View, Text, ScrollView } from 'react-native';
import { generateRecipe } from '@/services/api';

export default function HomeScreen() {
  const [ingredients, setIngredients] = useState('');
  const [dietaryPreferences, setDietaryPreferences] = useState('');
  const [recipe, setRecipe] = useState(null);

  const handleGenerateRecipe = async () => {
    try {
      const result = await generateRecipe(
        ingredients.split(',').map(ing => ing.trim()),
        dietaryPreferences.split(',').map(dp => dp.trim())
      );
      setRecipe(result);
    } catch (error) {
      console.error('Error generating recipe:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>FlavourCraft!</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Ingredientes (separe por vírgula)"
        value={ingredients}
        onChangeText={setIngredients}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Restrições alimentares (separe por vírgula)"
        value={dietaryPreferences}
        onChangeText={setDietaryPreferences}
      />
      
      <TouchableOpacity style={styles.button} onPress={handleGenerateRecipe}>
        <Text style={styles.buttonText}>Gerar Receita</Text>
      </TouchableOpacity>

      {recipe && (
        <View style={styles.recipeContainer}>
          <Text style={styles.recipeTitle}>{recipe.title}</Text>
          <Text>{recipe.instructions}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'orange',
    
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: 'black',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  button: {
    backgroundColor: '#6200EE', // Material Design primary color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  recipeContainer: {
    marginTop: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#ffffff',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  recipeTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#6200ea',
    marginBottom: 10,
  },
});

