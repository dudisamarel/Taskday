import { createStore, applyMiddleware, combineReducers , compose } from 'redux'
import thunk from 'redux-thunk';
import { boardReducer } from './reducers/boardReducer.js'

const rootReducer = combineReducers({
    boardModule: boardReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

// For Debug
window.theStore = store;
store.subscribe(() => {
    console.log('Global State is:', store.getState())
})

