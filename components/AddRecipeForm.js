import * as React from 'react'
import { Button, KeyboardAvoidingView, Image, Text, TextInput, View, StyleSheet } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'
import TakePhoto from '../components/Camera'
import TagInput from '../components/TagInput'
import Layout from '../constants/Layout'
import FormStyles from '../constants/FormStyles'

export default class AddRecipeForm extends React.Component {
  state = {
    id: '',
    label: '',
    image: '',
    dietLabels: [],
    ingredientLines: [],
    takePhoto: false,
    isFormValid: false,
  }

  componentDidMount() {
    this.getPermissionAsync()
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.label && this.state.label !== prevState.label) {
      this.validateForm()
    }
    if (this.props.recipe && prevProps.recipe !== this.props.recipe) {
      if (this.props.recipe.id) {
        this.setState({ id: this.props.recipe.id })
      }
      if (this.props.recipe.label) {
        this.setState({ label: this.props.recipe.label })
      }
      if (this.props.recipe.image) {
        this.setState({ image: this.props.recipe.image })
      }
      if (this.props.recipe.dietLabels) {
        this.setState({ dietLabels: this.props.recipe.dietLabels })
      }
      if (this.props.recipe.ingredientLines) {
        this.setState({ ingredientLines: this.props.recipe.ingredientLines })
      }
    }
  }

  getHandler = key => val => {
    this.setState({ [key]: val })
  }

  handleLabelChange = this.getHandler('label')
  handleImageChange = this.getHandler('image')

  validateForm = () => {
    if (this.state.label.length > 0) {
      this.setState({ isFormValid: true })
    } else {
      this.setState({ isFormValid: false })
    }
  }
  handleTags = (type, tags) => {
    if (type == 'Health Labels') {
      this.setState({ dietLabels: tags })
    } else if (type == 'Ingredients') {
      this.setState({ ingredientLines: tags })
    }
  }

  handleSubmit = () => {
    this.props.onSubmit(this.state)
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    })

    if (!result.cancelled) {
      this.setState({ image: result.uri })
    }
  }

  toggleTakePhoto = () => {
    this.setState(prevState => ({ takePhoto: !prevState.takePhoto }))
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={Layout.paddedContainer}>
        <Text style={FormStyles.label}>Label *</Text>
        <TextInput
          style={FormStyles.input}
          value={this.state.label}
          onChangeText={this.getHandler('label')}
        />
        <Button title="Pick an image from camera roll" onPress={this.pickImage} />
        <Button title="Take a photo" onPress={this.toggleTakePhoto} />
        {this.state.takePhoto && (
          <TakePhoto />
        )}
        {this.state.image !== '' && (
          <Image source={{ uri: this.state.image }} style={{ width: 200, height: 200 }} />
        )}
        <Text style={FormStyles.label}>Health Labels</Text>
        <TagInput label="Health Labels" value={this.state.dietLabels} onChangeTags={this.handleTags} />
        <Text style={FormStyles.label}>Ingredients</Text>
        <TagInput label="Ingredients" value={this.state.ingredientLines} onChangeTags={this.handleTags} />
        <Button title="Submit" onPress={this.handleSubmit} disabled={!this.state.isFormValid} />
      </KeyboardAvoidingView>
    )
  }
}
