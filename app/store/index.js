import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import reducers from './reducers';

const config = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [],
};

const persistedReducer = persistReducer(config, reducers);

let store = createStore(persistedReducer, applyMiddleware(thunk));
let persistor = persistStore(store);

export {store, persistor};
