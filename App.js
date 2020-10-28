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
import {ThemeContext, themes} from './app/context';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeContext.Provider value={themes.light}>
            <SafeAreaView style={styles.containerBack} />
            <SafeAreaView style={styles.container}>
              <StatusBar barStyle="dark-content" />
              <NavigationContainer>
                <AppNavigator />
              </NavigationContainer>
            </SafeAreaView>
          </ThemeContext.Provider>
        </PersistGate>
      </Provider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  containerBack: {
    flex: 0,
    backgroundColor: '#f4511e',
  },
});

export default App;
