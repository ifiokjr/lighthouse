import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  font: {
    fontSize: 20,
    color: 'black',
  },
});

export default class Root extends React.Component {
  public render() {
    return (
      <View style={[styles.centered]}>
        <Text style={[styles.font]}>Hello Lighthouse</Text>
      </View>
    );
  }
}

// console.disableYellowBox = true; // eslint-disable-line
