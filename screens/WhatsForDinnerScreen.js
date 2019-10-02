import React from 'react'
import { ScrollView, Text, Button, StyleSheet } from 'react-native'

export default class WhatsForDinnerScreen extends React.Component {

    render() {
        return (
            <ScrollView style={styles.container}>
                <Text>What's for Dinner</Text>
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
