import React from 'react';
import { ScrollView, View, Button, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux'
import { updateSchedule, removeScheduleEntry } from '../redux/actions'
import RandomRecipeSelector from '../components/RandomRecipeSelector'
import Row from '../components/Row'
import { fetchRecipe, fetchRestaurant } from '../api'
import Typography from '../constants/Typography'
import Layout from '../constants/Layout'

class MyScheduleScreen extends React.Component {

    static navigationOptions = () => ({
        headerTitle: 'My Schedule',
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
        thisWeek: [],
        dinnerOptions: []
    }

    componentDidMount() {
        this.constructThisWeek()
    }
    // Construct the Current Week Array and Store it in the State 
    constructThisWeek = async () => {
        let thisWeek = []
        const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        for (let i = 0; i < 7; i++) {
            let targetDate = new Date();
            targetDate.setDate(targetDate.getDate() + i)
            const mm = targetDate.getMonth() + 1
            const dd = targetDate.getDate()
            const yyyy = targetDate.getFullYear()
            const id = [yyyy, mm, dd].join('')
            thisWeek = [...thisWeek, { weekday: weekdays[targetDate.getDay()], id }]
        }
        await this.setState({ thisWeek: thisWeek });
        await this.setState({ dinnerOptions: [...this.props.myRecipes.filter(recipe => recipe.favourite == true).map(recipe => ({ id: recipe.id, type: 'my-recipe' })), ...this.props.favourites] })
        // Add Recipes and Restaurant Entrys on Specified Days
        this.updateThisWeek()
    }

    componentDidUpdate(prevProps) {
        // Dinner Options are used by the Random Selector and they are made up of favourite recipes
        // Dinner Options are updated when new recipes are added or new restaurants/external recipes are marked as favourite 
        if (this.props.myRecipes !== prevProps.myRecipes || this.props.favourites !== prevProps.favourites) {
            this.setState({ dinnerOptions: [...this.props.myRecipes.filter(recipe => recipe.favourite == true).map(recipe => ({ id: recipe.id, type: 'my-recipe' })), ...this.props.favourites] })
        }
        // When a new entry is added to the schedule the current week array is updated
        if (prevProps.schedule.length < this.props.schedule.length) {
            this.updateThisWeek()
        }
    }

    handleRandomRecipe = (id, weekday, recipeID, type) => {
        const newEntry = { weekday, id, recipeID: recipeID, type: type }
        this.props.updateSchedule(newEntry)
    }

    // Uses the Current Week Array and Adds Entries Referencing the Redux Schedule
    updateThisWeek = () => {
        this.state.thisWeek.forEach(async entry => {
            const scheduleDay = this.props.schedule.filter(day => (day.id == entry.id))
            if (scheduleDay.length > 0) {
                let recipe = ''
                if (scheduleDay[0].type == 'my-recipe') {
                    recipe = await this.props.myRecipes.filter(recipe => (recipe.id == scheduleDay[0].recipeID))
                } else if (scheduleDay[0].type == 'recipe') {
                    recipe = await fetchRecipe(scheduleDay[0].recipeID, this.props.favourites)
                } else if (scheduleDay[0].type == 'restaurant') {
                    recipe = await fetchRestaurant(scheduleDay[0].recipeID, this.props.favourites)
                }
                const newEntry = { weekday: scheduleDay[0].weekday, id: scheduleDay[0].id, type: scheduleDay[0].type, recipe: recipe[0] }
                await this.setState({ thisWeek: [newEntry].concat(this.state.thisWeek.filter(week => (week.id !== entry.id))).sort((a, b) => a.id - b.id) })
            }
        })
    }

    handleSelectRecipe = recipe => {
        this.props.navigation.push('RecipeDetails', { recipe, type: recipe.type })
    }

    handleRemoveEntry = id => {
        // Remove Entry from Schedule
        this.props.removeScheduleEntry(id)
        // Remove Entry from Current Week Array
        const thisWeek = this.state.thisWeek.map(day => {
            if (day.id == id) {
                return { weekday: day.weekday, id: day.id }
            } else {
                return day
            }
        })
        this.setState({ thisWeek: thisWeek })
    }

    render() {
        return (
            <ScrollView style={Layout.paddedContainer}>
                {this.state.thisWeek.map(item =>
                    <View key={item.id}>
                        <Text style={Typography.headingThree}>{item.weekday}</Text>
                        {item.recipe ? <Row recipe={item.recipe} type={item.type} dateID={item.id} onSelectRecipe={this.handleSelectRecipe} onRemoveEntry={this.handleRemoveEntry} />
                            : <RandomRecipeSelector dateID={item.id} weekday={item.weekday} dinnerOptions={this.state.dinnerOptions} handleRandomRecipe={this.handleRandomRecipe} />}
                    </View>
                )}
            </ScrollView>
        )
    }
}

const mapStateToProps = state => ({
    myRecipes: state.myRecipes,
    schedule: state.schedule,
    favourites: state.favourites
})

export default connect(mapStateToProps, { updateSchedule: updateSchedule, removeScheduleEntry: removeScheduleEntry })(MyScheduleScreen)
