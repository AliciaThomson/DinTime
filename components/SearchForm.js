import React from 'react'
import { KeyboardAvoidingView, TextInput } from 'react-native'
import FormStyles from '../constants/FormStyles'

export default class SearchForm extends React.Component {
    state = {
        searchKeys: ''
    }

    handleSearch = searchKeys => {
        this.setState({ searchKeys })
        if (searchKeys.length > 3) {
            this.props.onSearch(searchKeys)
        }
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" >
                <TextInput
                    style={FormStyles.input}
                    value={this.state.searchKeys}
                    onChangeText={this.handleSearch}
                    placeholder="Search..."
                />
            </KeyboardAvoidingView>
        )
    }
}