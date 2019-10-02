import { login } from '../api'

/* --  Action Types  -- */

export const UPDATE_USER = 'UPDATE_USER'
export const LOG_IN_SENT = 'LOG_IN_SENT'
export const LOG_IN_FULFILLED = 'LOG_IN_FULFILLED'
export const LOG_IN_REJECTED = 'LOG_IN_REJECTED'

export const UPDATE_RECIPE = 'UPDATE_RECIPE'
export const REMOVE_RECIPE = 'REMOVE_RECIPE'

export const UPDATE_FAVOURITES = 'UPDATE_FAVOURITES'
export const REMOVE_FAVOURITE = 'REMOVE_FAVOURITE'

export const UPDATE_SCHEDULE = 'UPDATE_SCHEDULE'
export const REMOVE_SCHEDULE_ENTRY = 'REMOVE_SCHEDULE_ENTRY'

/* --  Action Creators  -- */

export const updateUser = update => ({
  type: UPDATE_USER,
  payload: update,
})

export const updateMyRecipe = newRecipe => ({
  type: UPDATE_RECIPE,
  payload: newRecipe,
})

export const removeMyRecipe = id => ({
  type: REMOVE_RECIPE,
  payload: id,
})

export const updateFavourites = newFavourite => ({
  type: UPDATE_FAVOURITES,
  payload: newFavourite,
})

export const removeFavourite = id => ({
  type: REMOVE_FAVOURITE,
  payload: id,
})

export const updateSchedule = entry => ({
  type: UPDATE_SCHEDULE,
  payload: entry,
})
export const removeScheduleEntry = id => ({
  type: REMOVE_SCHEDULE_ENTRY,
  payload: id,
})

/* --  Async Action Creator  -- */

export const logInUser = (username, password) => async dispatch => {
  dispatch({ type: LOG_IN_SENT })
  try {
    const token = await login(username, password)
    dispatch({ type: LOG_IN_FULFILLED, payload: token })
  } catch (err) {
    dispatch({ type: LOG_IN_REJECTED, payload: err.message })
  }
}
