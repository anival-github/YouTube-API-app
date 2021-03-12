import {
  applyMiddleware, combineReducers, compose, createStore,
} from 'redux';
import thunkMiddleWare from 'redux-thunk';
import linkReducer from './link-reducer';
import searchReducer from './search-reducer';
import appReducer from './app-reducer';

export const rootReducer = combineReducers({
  app: appReducer,
  link: linkReducer,
  search: searchReducer,
});

export type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleWare)));

export default store;
