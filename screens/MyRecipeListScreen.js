import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux'
import { updateMyRecipe } from '../redux/actions'
import Layout from '../constants/Layout'

class MyRecipeListScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state
        return {
            headerTitle: 'My Recipes',
            headerRight: (
                // Pass the Next ID to ensure it is unique
                <Button title="Add New" onPress={() => navigation.push('AddMyRecipe', { recipe: { id: params.maxid }, myRecipe: true })} color="#173143" />
            ),
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
    }

    componentDidMount() {
        this.getHighestID()
    }

    componentDidUpdate(prevProps) {
        if (this.props.myRecipes !== prevProps.myRecipes) {
            this.getHighestID()
        }
    }

    getHighestID = async () => {
        var nextId = 0
        // Look for the highest ID 
        await this.props.myRecipes.map(function (recipe) {
            if (recipe.id > nextId) {
                nextId = recipe.id
            }
        })
        // Increment the highest ID
        nextId++
        this.props.navigation.setParams({
            maxid: nextId + ''
        })
    }

    handleSelectRecipe = recipe => {
        this.props.navigation.push('RecipeDetails', { recipe, type: 'my-recipe' })
    }

    handleFavourite = recipe => {
        this.props.updateMyRecipe({ ...recipe, favourite: !recipe.favourite })
    }

    render() {
        return (
            <View style={Layout.paddedContainer}>
                <RecipeList
                    recipes={this.props.myRecipes}
                    type='my-recipe'
                    onSelectRecipe={this.handleSelectRecipe}
                    handleFavourite={this.handleFavourite}
                />
                <Button title="Search for More" onPress={() => this.props.navigation.navigate('RecipeList')} color="#173143" />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    myRecipes: state.myRecipes,
    favourites: state.favourites,
})

export default connect(mapStateToProps, { updateMyRecipe: updateMyRecipe })(MyRecipeListScreen)
