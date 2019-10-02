import React from 'react'
import AddRecipeForm from '../components/AddRecipeForm'
import { connect } from 'react-redux'
import { updateMyRecipe } from '../redux/actions'

class AddMyRecipeScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'New Recipe',
    headerTintColor: '#173143',
    headerStyle: {
      backgroundColor: '#fff',
      height: 60
    },
    headerTitleStyle: {
      fontFamily: 'Quicksand-Bold',
      fontSize: 20
    }
  }

  state = {
    edit: false,
    recipe: null
  }

  componentDidMount() {
    const recipeDetails = this.props.navigation.getParam('recipe')
    this.setState({ recipe: recipeDetails })
  }

  handleSubmit = formState => {
    this.props.updateMyRecipe({ id: formState.id, label: formState.label, image: formState.image, healthLabels: formState.healthLabels, ingredientLines: formState.ingredientLines, favourite: true })
    this.props.navigation.navigate('MyRecipeList')
  }

  render() {
    return (
      <AddRecipeForm
        recipe={this.state.recipe}
        onSubmit={this.handleSubmit}
      />
    )
  }
}

export default connect(null, { updateMyRecipe: updateMyRecipe })(AddMyRecipeScreen)
