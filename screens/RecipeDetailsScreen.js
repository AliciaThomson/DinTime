import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import RecipeDetails from '../components/RecipeDetails'
import { connect } from 'react-redux'
import { removeMyRecipe, updateMyRecipe, updateFavourites, removeFavourite } from '../redux/actions'

class RecipeDetailsScreen extends React.Component {

  state = {
    type: '',
    recipe: null
  }

  componentDidMount() {
    const type = this.props.navigation.getParam('type')
    if (type) this.setState({ type })

    const recipe = this.props.navigation.getParam('recipe')
    if (recipe) this.setState({ recipe })
  }

  handleEditRecipe = (recipe, myRecipe) => {
    this.props.navigation.push('AddMyRecipe', { recipe, myRecipe })
  }

  handleFavourite = (recipe, type) => {
    if (type == 'my-recipe') {
      this.props.updateMyRecipe({ ...recipe, favourite: !recipe.favourite })
    } else {
      if (recipe.favourite) {
        this.props.removeFavourite(recipe.id)
      } else {
        this.props.updateFavourites({ id: recipe.id, type })
      }
      const updatedRecipe = { ...this.state.recipe, favourite: !recipe.favourite }
      this.setState({ recipe: updatedRecipe })
    }
  }

  handleDeleteRecipe = id => {
    this.props.removeMyRecipe(id)
    this.props.navigation.navigate('MyRecipeList')
  }

  render() {
    return (
      <ScrollView style={styles.detailsContainer}>
        {this.state.recipe && (
          <RecipeDetails
            myRecipe={this.state.myRecipe}
            type={this.state.type}
            recipe={this.state.recipe}
            handleFavourite={this.handleFavourite}
            onEditRecipe={this.handleEditRecipe}
            onDeleteRecipe={this.handleDeleteRecipe}
          />
        )}
      </ScrollView>
    )
  }
}

RecipeDetailsScreen.navigationOptions = {
  headerTitle: null,
};

const styles = StyleSheet.create({
  detailsContainer: {
    flex: 1,
  },
})
export default connect(null, { updateMyRecipe, removeMyRecipe: removeMyRecipe, updateFavourites, removeFavourite })(RecipeDetailsScreen)
