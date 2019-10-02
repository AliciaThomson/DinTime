import React from 'react'
import { Provider } from 'react-redux'
import { AppLoading } from 'expo'
import * as Font from 'expo-font'
import { PersistGate } from 'redux-persist/integration/react'
import { Platform, StatusBar } from 'react-native'
import AppNavigator from './navigation/AppNavigator'
import { store, persistor } from './redux/store'

export default class App extends React.Component {
  state = {
    isReady: false,
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={loadResourcesAsync}
          onError={handleLoadingError}
          onFinish={() => {
            this.setState({ isReady: true })
          }}
        />
      )
    } else {
      return (
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <AppNavigator />
          </PersistGate>
        </Provider>
      )
    }
  }
}

loadResourcesAsync = async () => {
  await Promise.all([
    Font.loadAsync({
      'Quicksand-Regular': require('./assets/fonts/Quicksand-Regular.ttf'),
      'Quicksand-Medium': require('./assets/fonts/Quicksand-Medium.ttf'),
      'Quicksand-Bold': require('./assets/fonts/Quicksand-Bold.ttf'),
    }),
  ])
}

function handleLoadingError(error) {
  console.warn(error);
}
