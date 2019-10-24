import React from 'react'
import { ScrollView, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'

export default class WhatsForDinnerScreen extends React.Component {

    handleRandomRecipe = (id, weekday, recipeID, type) => {
        const newEntry = { weekday, id, recipeID: recipeID, type: type }
        this.props.updateSchedule(newEntry)
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Text>What Do You Want to Do?</Text>
                <TouchableOpacity></TouchableOpacity>
                <Button title="Go to random recipe" onPress={this.goToRandomRecipe} />
            </ScrollView>
        )
    }

    goToRandomRecipe = () => {
        const { recipes } = this.props.screenProps
        const label = this.props.navigation.getParam('label')
        let randomRecipe
        while (!randomRecipe) {
            const randomIndex = Math.floor(Math.random() * recipes.length)
            if (recipes[randomIndex].label !== label) {
                randomRecipe = recipes[randomIndex]
            }
        }

        this.props.navigation.push('RecipeDetails', {
            ...randomRecipe,
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
});
