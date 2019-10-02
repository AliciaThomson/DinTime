import React from "react"
import { TouchableOpacity, View, Text, StyleSheet } from "react-native"
import Tags from "react-native-tags"
import { AntDesign } from '@expo/vector-icons'
import FormStyles from '../constants/FormStyles'

export default TagInput = props => (
    <Tags
        textInputProps={{
            placeholder: props.label
        }}
        initialTags={props.value}
        onChangeTags={tags => props.onChangeTags(props.label, tags)}
        createTagOnString={[","]}
        inputStyle={{ ...FormStyles.input, ...styles.tagInput }}
        containerStyle={props.label == 'Health Labels' ? styles.tagsWrapperStyle : styles.rowWrapperStyle}
        renderTag={({ tag, index, onPress, deleteTagOnPress, readonly }) => (
            <TouchableOpacity key={`${tag}-${index}`} style={props.label == 'Health Labels' ? styles.tagContainerStyle : styles.rowContainerStyle} onPress={onPress}>
                <Text style={props.label == 'Health Labels' && styles.tagTextStyle}>{tag} <AntDesign name="close" size={10} color={props.label == 'Health Labels' ? "white" : "#333"}></AntDesign></Text>
            </TouchableOpacity>
        )}
    />
)
const styles = StyleSheet.create({
    tagsWrapperStyle: {
        justifyContent: "center",
    },
    rowWrapperStyle: {
        flexDirection: 'column',
        alignItems: 'stretch',
        marginHorizontal: 0,
        marginBottom: 30
    },
    rowContainerStyle: {
        backgroundColor: "transparent",
        paddingLeft: 10,
        marginVertical: 10,
    },
    tagContainerStyle: {
        backgroundColor: "#888",
        padding: 5,
        paddingLeft: 10,
        marginRight: 5,
        borderRadius: 3
    },
    tagTextStyle: {
        fontWeight: 'bold',
        color: '#fff'
    },
    tagInput: {
        minHeight: 25,
        flex: 0,
    }
})