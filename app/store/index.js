import {createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import reducers from './reducers';

const config = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [],
};

const persistedReducer = persistReducer(config, reducers);

let store = createStore(persistedReducer);
let persistor = persistStore(store);

export {store, persistor};
