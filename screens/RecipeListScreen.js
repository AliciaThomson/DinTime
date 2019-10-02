import React from 'react'
import { View } from 'react-native'

import SearchForm from '../components/SearchForm'
import RecipeList from '../components/RecipeList'

import Layout from '../constants/Layout'
import { searchRecipes } from '../api'
import { connect } from 'react-redux'
import { updateFavourites, removeFavourite } from '../redux/actions'

class RecipeListScreen extends React.Component {
  static navigationOptions = () => ({
    headerTitle: 'All Recipes',
    headerTintColor: '#173143',
    headerStyle: {
      backgroundColor: '#fff',
      height: 60
    },
    headerTitleStyle: {
      fontFamily: 'Quicksand-Bold',
      fontSize: 20
    }
  })

  state = {
    recipes: null,
    favourites: [],
    searchKeys: ''
  }

  componentDidMount() {
    this.getRecipes('chicken')
  }

  getRecipes = async searchKeys => {
    const results = await searchRecipes(searchKeys, 0, 30, this.props.favourites)
    this.setState({ recipes: results })
  }

  handleSelectRecipe = recipe => {
    this.props.navigation.push('RecipeDetails', { recipe, type: 'recipe' })
  }

  handleFavourite = recipe => {
    if (recipe.favourite) {
      this.props.removeFavourite(recipe.id)
    } else {
      this.props.updateFavourites({ id: recipe.id, type: 'recipe' })
    }
    updatedRecipes = this.state.recipes.map(value => {
      if (value.id == recipe.id) {
        value.favourite = !recipe.favourite
      }
      return value
    })
    this.setState({ recipes: updatedRecipes })
  }

  render() {
    return (
      <View style={Layout.paddedContainer}>
        <SearchForm onSearch={this.getRecipes} />
        <RecipeList
          recipes={this.state.recipes}
          type='recipe'
          onSelectRecipe={this.handleSelectRecipe}
          handleFavourite={this.handleFavourite}
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  favourites: state.favourites,
})

export default connect(mapStateToProps, { updateFavourites: updateFavourites, removeFavourite: removeFavourite })(RecipeListScreen)
