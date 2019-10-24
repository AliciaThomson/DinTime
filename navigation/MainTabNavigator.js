import React from 'react'
import { createAppContainer, createStackNavigator, createBottomTabNavigator } from 'react-navigation'

import TabBarIcon from '../components/TabBarIcon'

import MyRecipeListScreen from '../screens/MyRecipeListScreen'
import RecipeListScreen from '../screens/RecipeListScreen'
import AddMyRecipeScreen from '../screens/AddMyRecipeScreen'
import RecipeDetailsScreen from '../screens/RecipeDetailsScreen'
import MyScheduleScreen from '../screens/MyScheduleScreen'
import RestaurantsScreen from '../screens/RestaurantsScreen'

const MyScheduleStack = createStackNavigator({
  MySchedule: MyScheduleScreen,
  RecipeDetails: RecipeDetailsScreen,
})

MyScheduleStack.navigationOptions = {
  tabBarLabel: 'MySchedule',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'calendar'} />
  ),
}

MyScheduleStack.path = ''

const RecipesStack = createStackNavigator(
  {
    MyRecipeList: MyRecipeListScreen,
    RecipeList: RecipeListScreen,
    RecipeDetails: RecipeDetailsScreen,
    AddMyRecipe: AddMyRecipeScreen
  },
  {
    initialRouteName: 'MyRecipeList',
  }
)

RecipesStack.navigationOptions = {
  tabBarLabel: 'My Recipes',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'book'}
    />
  ),
}

RecipesStack.path = ''

const RestaurantsStack = createStackNavigator(
  {
    RestaurantsMap: RestaurantsScreen
  },
  {
    initialRouteName: 'RestaurantsMap'
  }
)

RestaurantsStack.navigationOptions = {
  tabBarLabel: 'Restaurants',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'isv'}
    />
  ),
}
export default createAppContainer(
  createBottomTabNavigator({
    MyScheduleStack,
    RecipesStack,
    RestaurantsStack,
  },
    {
      tabBarOptions: {
        activeTintColor: '#173143',
        style: {
          height: 55,
          paddingVertical: 10
        },
      },
      initialLayout: {
        height: 55,
      }
    })
);
