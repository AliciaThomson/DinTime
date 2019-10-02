
const processRecipe = (recipe, favourites) => {
  const formattedRecipe = {
    id: recipe.uri,
    image: recipe.image,
    label: recipe.label,
    healthLabels: recipe.healthLabels,
    ingredientLines: recipe.ingredientLines,
    totalDaily: { carbs: {}, fat: {}, protein: {} },
    favourite: favourites.some(favourite => favourite.id == recipe.uri)
  }
  if (recipe.totalDaily.CHOCDF) {
    formattedRecipe.totalDaily.carbs = { label: 'Carbs', quantity: Math.round(recipe.totalDaily.CHOCDF.quantity / recipe.yield) }
  }
  if (recipe.totalDaily.FAT) {
    formattedRecipe.totalDaily.fat = { label: 'Fat', quantity: Math.round(recipe.totalDaily.FAT.quantity / recipe.yield) }
  }
  if (recipe.totalDaily.PROCNT) {
    formattedRecipe.totalDaily.protein = { label: 'Protein', quantity: Math.round(recipe.totalDaily.PROCNT.quantity / recipe.yield) }
  }
  return formattedRecipe
}

export const searchRecipes = async (keys, from, to, favourites) => {
  const searchResults = await fetch('https://api.edamam.com/search?q=' + keys + '&from=' + from + '&to=' + to + '&mealType=dinner&app_id=7424840b&app_key=4b3eb4c03b93a6f5c6fe2df20d107b8f')

  if (searchResults.ok) {
    const { hits } = await searchResults.json()
    return hits.map(recipe => {
      return processRecipe(recipe.recipe, favourites)
    })
  }
}

export const fetchRecipe = async (id, favourites) => {
  const recipe = await fetch('https://api.edamam.com/search?r=' + encodeURIComponent(id) + '&app_id=7424840b&app_key=4b3eb4c03b93a6f5c6fe2df20d107b8f')

  let recipeDetails = await recipe.json()
  return recipeDetails.map(recipe => {
    return processRecipe(recipe, favourites)
  })

}


export const getRestaurants = async (latitude, longitude, favourites) => {
  const getRestaurants = await fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + latitude + ',' + longitude + '&radius=3000&types=restaurant&key=AIzaSyDbkLVAtubzokxKn3gJL3Mcd9Sxaknk0Y8')

  if (getRestaurants.ok) {
    const { results } = await getRestaurants.json()
    return results.map(restaurant => {
      return {
        id: restaurant.place_id,
        name: restaurant.name,
        rating: restaurant.rating,
        vicinity: restaurant.vicinity,
        geometry: restaurant.geometry,
        favourite: favourites.some(favourite => favourite.id == restaurant.place_id)
      }
    })
  }
}

export const fetchRestaurant = async (id, favourites) => {
  const getRestaurant = await fetch('https://maps.googleapis.com/maps/api/place/details/json?place_id=' + id + '&fields=name,vicinity&key=AIzaSyDbkLVAtubzokxKn3gJL3Mcd9Sxaknk0Y8')

  if (getRestaurant.ok) {
    const { result } = await getRestaurant.json()
    return [result].map(restaurant => {
      return {
        id,
        label: restaurant.name,
        vicinity: restaurant.vicinity,
        favourite: favourites.some(favourite => favourite.id == id)
      }
    })
  }
}

export const login = async (username, password) => {
  const response = await fetch('http://localhost:8000', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })

  if (response.ok) {
    const { token } = await response.json()
    return token
  }

  const errMessage = await response.text()
  throw new Error(errMessage)
}
