import * as React from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import firebase from './firebase';

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  font: {
    fontSize: 20,
    color: 'black',
    marginBottom: 50,
  },
  image: {
    width: 200,
    height: 200,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
  },
  textContainer: {
    position: 'absolute',
    top: 50,
  },
});

const THRESHHOLD = 20;

interface RootState {
  presses: number;
  activations: number;
}

export default class Root extends React.Component {
  public state: RootState = {
    presses: 0,
    activations: 0,
  };

  public componentDidMount() {
    firebase.analytics().setCurrentScreen('Main Screen');
  }

  private onPress = () => {
    this.setState((prevState: RootState) => {
      const presses = prevState.presses + 1;
      if (presses >= THRESHHOLD) {
        return { presses: 0, activations: prevState.activations + 1 };
      }
      return { presses };
    });
  }

  private onButtonPress = () => {
    firebase.analytics().logEvent('PaymentButtonPressed', { ...this.state    });
  }

  public render() {
    const { presses, activations } = this.state;
    return (
      <View style={[styles.centered]}>
        <View style={[styles.textContainer]}>
          <Text>Presses: {presses}</Text>
          <Text>Activations: {activations}</Text>
        </View>
        <Text style={[styles.font]}>Press To Donate Below</Text>
        <TouchableHighlight onPress={this.onPress}>
          <Image
            style={[styles.image]}
            source={require('../assets/hotchoc_wm.png')}
          />
        </TouchableHighlight>
        <View style={[styles.buttonContainer]}>
          <Button
            color='#841584'
            title='Set up payment'
            onPress={this.onButtonPress}
          />
        </View>
      </View>
    );
  }
}

console.disableYellowBox = true;
