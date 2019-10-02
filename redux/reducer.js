import { combineReducers } from 'redux'

import { UPDATE_USER, UPDATE_RECIPE, REMOVE_RECIPE, UPDATE_FAVOURITES, REMOVE_FAVOURITE, UPDATE_SCHEDULE, REMOVE_SCHEDULE_ENTRY, LOG_IN_SENT, LOG_IN_FULFILLED, LOG_IN_REJECTED } from './actions'


const myRecipeReducer = (state = [], action) => {
  switch (action.type) {
    case UPDATE_RECIPE:
      return [action.payload].concat(state).filter(function (myRecipe) { return this[myRecipe.id] ? false : this[myRecipe.id] = true }, {});
    case REMOVE_RECIPE:
      return state.filter((myRecipe) => myRecipe.id !== action.payload);
    default:
      return state
  }
}

const favouritesReducer = (state = [], action) => {
  switch (action.type) {
    case UPDATE_FAVOURITES:
      return [...state, action.payload]
    case REMOVE_FAVOURITE:
      return state.filter((favourite) => favourite.id !== action.payload);
    default:
      return state
  }
}

const scheduleReducer = (state = [], action) => {
  switch (action.type) {
    case UPDATE_SCHEDULE:
      return [action.payload].concat(state).filter(function (day) { return this[day.id] ? false : this[day.id] = true }, {});
    case REMOVE_SCHEDULE_ENTRY:
      return state.filter((entry) => entry.id !== action.payload);
    default:
      return state
  }
}

const merge = (prev, next) => Object.assign({}, prev, next)

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return merge(state, action.payload)
    case LOG_IN_FULFILLED:
      return merge(state, { token: action.payload })
    case LOG_IN_REJECTED:
      return merge(state, { loginErr: action.payload })
    default:
      return state
  }
}

const reducer = combineReducers({
  user: userReducer,
  myRecipes: myRecipeReducer,
  favourites: favouritesReducer,
  schedule: scheduleReducer
})

export default reducer
