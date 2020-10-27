/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './app/store';

import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './app/navigations';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
          </SafeAreaView>
        </PersistGate>
      </Provider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
