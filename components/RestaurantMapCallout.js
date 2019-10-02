import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import Typography from '../constants/Typography'

export default RestaurantMapCallout = props => (
    <View style={styles.contentWrapper}>
        <Text style={{ ...Typography.headingThree, ...styles.calloutheading }}>{props.name}</Text>
        <Text>{props.address}</Text>
        <Text>{props.favourite}</Text>
        <FontAwesome name={props.favourite ? "heart" : "heart-o"} style={styles.heartIcon} size={30} color="red" ></FontAwesome>
    </View>
)

const styles = StyleSheet.create({
    calloutheading: {
        flex: 0.5,
        maxWidth: 200,
        flexWrap: 'wrap',
    },
    contentWrapper: {
        paddingHorizontal: 10,
        paddingBottom: 10,
        flexDirection: 'column',
        flexWrap: 'wrap',
        width: 250,
    },
    heartIcon: {
        position: 'absolute',
        top: 20,
        right: 10,
    }
});
