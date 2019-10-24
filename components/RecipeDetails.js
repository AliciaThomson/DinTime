import React from 'react'
import { View, Image, Text, Button, StyleSheet } from 'react-native'
import { MaterialIcons, FontAwesome, AntDesign } from '@expo/vector-icons'
import Typography from '../constants/Typography'


export default RecipeDetails = props => (
    <View>
        {props.type == 'my-recipe' && (
            <MaterialIcons name="edit" size={32} color="white" style={styles.editIcon} onPress={() => props.onEditRecipe(props.recipe, props.myRecipe)}></MaterialIcons>
        )}
        <FontAwesome name={props.recipe.favourite ? "heart" : "heart-o"} size={32} color="white" style={styles.favouriteIcon} onPress={() => props.handleFavourite(props.recipe, props.type)}></FontAwesome>

        {props.recipe.image && props.recipe.image !== '' ?
            <Image
                style={styles.imageStyles}
                resizeMode="cover"
                source={{ uri: props.recipe.image }} />
            : <View style={styles.imagePlaceholder}>
                {props.type == 'restaurant' ?
                    <AntDesign name='isv' size={120} style={styles.Icon} color='#ddd' />
                    : <FontAwesome name='image' size={120} style={styles.Icon} color='#ddd' />
                }
            </View>
        }
        <View style={styles.container}>
            <Text style={Typography.headingTwo}>
                {props.recipe.label}
            </Text>
            {props.recipe.dietLabels && (
                <View key="dietLabels">
                    {props.recipe.dietLabels.map((item, index) =>
                        <Text key={index}>
                            {item}
                        </Text>
                    )}
                </View>
            )}
            {props.recipe.totalDaily && Object.keys(props.recipe.totalDaily).length > 0 && (
                <View key="totalDaily">
                    <Text style={Typography.headingThree}>Macros</Text>
                    {Object.keys(props.recipe.totalDaily).map((key, index) =>
                        props.recipe.totalDaily[key].quantity > 0 &&
                        <Text key={index}>
                            {props.recipe.totalDaily[key].label}: {props.recipe.totalDaily[key].quantity}%
                        </Text>
                    )}
                </View>
            )}
            {props.recipe.ingredientLines && props.recipe.ingredientLines.length > 0 && (
                <View key="ingredients">
                    <Text style={Typography.headingThree}>Ingredients</Text>
                    {props.recipe.ingredientLines.map((item, index) =>
                        <Text key={index}>
                            {item}
                        </Text>
                    )}
                </View>
            )}
            {props.type == 'my-recipe' && (
                <Button title="Delete" onPress={() => props.onDeleteRecipe(props.recipe.id)} />
            )}
        </View>
    </View>
)

const styles = StyleSheet.create({
    container: {
        paddingTop: 15,
        paddingHorizontal: 15,
        paddingBottom: 40,
    },
    editIcon: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 2,
    },
    favouriteIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 2,
    },
    imageStyles: {
        flex: 1,
        height: 400
    },
    imagePlaceholder: {
        flex: 1,
        height: 200,
        backgroundColor: '#bbb',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    Icon: {
        marginTop: 40,
    },
    heading: {
        fontSize: 20,
        fontWeight: '600',
        marginTop: 20,
        marginBottom: 10
    }
});