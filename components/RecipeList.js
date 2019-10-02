import React from 'react'
import { FlatList, StyleSheet } from 'react-native'

import Row from './Row'

export default RecipeList = props => (

  <FlatList
    keyExtractor={item => item.id}
    style={styles.recipeList}
    data={props.recipes}
    renderItem={({ item }) => <Row recipe={item}
      type={props.type}
      onSelectRecipe={props.onSelectRecipe}
      handleFavourite={props.handleFavourite}
    />} />

)

const styles = StyleSheet.create({
  recipeList: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 20,
  },
})