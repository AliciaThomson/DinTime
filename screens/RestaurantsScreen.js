import React from 'react';
import { View } from 'react-native'
import { getRestaurants } from '../api'
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import RestaurantMapCallout from '../components/RestaurantMapCallout'
import { connect } from 'react-redux'
import { updateFavourites, removeFavourite } from '../redux/actions'

class RestaurantsScreen extends React.Component {

    static navigationOptions = () => ({
        headerTitle: 'Restaurants',
        headerTintColor: '#173143',
        headerStyle: {
            backgroundColor: '#fff',
            height: 60
        },
        headerTitleStyle: {
            fontFamily: 'Quicksand-Bold',
            fontSize: 20
        }
    })

    state = {
        region: '',
        restaurants: [],
        searchKeys: ''
    }

    componentDidMount() {
        this.getLocationAsync()
    }

    getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        let location = await Location.getCurrentPositionAsync({});
        this.setState({
            region: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922 / 2,
                longitudeDelta: 0.0421 / 2,
            }
        })

        const results = await getRestaurants(location.coords.latitude, location.coords.longitude, this.props.favourites)
        this.setState({ restaurants: results })
    }

    handleFavourite = restaurant => {
        if (restaurant.favourite) {
            this.props.removeFavourite(restaurant.id)
        } else {
            this.props.updateFavourites({ id: restaurant.id, type: 'restaurant' })
        }
        updatedRestaurants = this.state.restaurants.map(item => {
            if (item.id == restaurant.id) {
                item.favourite = !restaurant.favourite
            }
            return item
        })
        this.setState({ restaurants: updatedRestaurants })
    }


    render() {
        if (!this.state.region) {
            return (
                <View />
            )
        }
        return (
            <MapView
                region={this.state.region}
                style={{ flex: 1 }}
                provider={PROVIDER_GOOGLE}
                onRegionChange={this.onRegionChange}
            >
                {this.state.restaurants !== [] && this.state.restaurants.map(marker => (
                    <Marker
                        key={marker.id}
                        title={marker.name}
                        coordinate={{
                            latitude: marker.geometry.location.lat,
                            longitude: marker.geometry.location.lng
                        }} tracksInfoWindowChanges={true} >
                        <Callout onPress={() => this.handleFavourite(marker)}>
                            <RestaurantMapCallout name={marker.name} address={marker.vicinity} favourite={marker.favourite} />
                        </Callout>
                    </Marker>
                ))}
            </MapView>
        )
    }
}

const mapStateToProps = state => ({
    favourites: state.favourites,
})

export default connect(mapStateToProps, { updateFavourites: updateFavourites, removeFavourite: removeFavourite })(RestaurantsScreen)
