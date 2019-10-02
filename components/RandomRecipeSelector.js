import React from 'react'
import { Button } from 'react-native'

export default class RandomRecipeSelector extends React.Component {

    goToRandomRecipe = () => {
        const randomIndex = Math.floor(Math.random() * this.props.dinnerOptions.length)
        const entry = this.props.dinnerOptions[randomIndex];
        this.props.handleRandomRecipe(this.props.dateID, this.props.weekday, entry.id, entry.type)
    }

    render() {
        return (
            <Button title="Select Random Recipe" onPress={this.goToRandomRecipe} />
        )
    }

}
