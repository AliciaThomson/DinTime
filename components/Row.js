import React from 'react'
import { TouchableOpacity, Image, View, Text, StyleSheet } from 'react-native'
import { FontAwesome, AntDesign } from '@expo/vector-icons'
import Typography from '../constants/Typography'
import Layout from '../constants/Layout'

export default Row = props => (
  <TouchableOpacity style={Layout.row} onPress={() => props.onSelectRecipe(props.recipe)}>
    {props.recipe.image && props.recipe.image !== '' ?
      <Image style={{ width: 50, height: 50, marginRight: 15 }} source={{ uri: props.recipe.image }} />
      : <View style={styles.imagePlaceholder}>
        {props.type == 'restaurant' ?
          <AntDesign name='isv' size={28} style={styles.Icon} color='#bbb' />
          : <FontAwesome name='image' size={28} style={styles.Icon} color='#bbb' />
        }
      </View>
    }
    <Text style={{ ...Typography.headingFour, ...styles.rowText }}>{props.recipe.label}</Text>
    {props.onRemoveEntry ?
      <AntDesign name="closecircleo" size={32} color="red" onPress={() => props.onRemoveEntry(props.dateID)}></AntDesign>
      : <FontAwesome name={props.recipe.favourite ? "heart" : "heart-o"} size={32} color="red" onPress={() => props.handleFavourite(props.recipe, props.type)}></FontAwesome>
    }
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  rowText: {
    width: '70%'
  },
  imagePlaceholder: {
    width: 50,
    height: 50,
    marginRight: 15,
    backgroundColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  Icon: {
    marginTop: 10,
  }
})

