import {createStore,compose,applyMiddleware} from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk';



const allStoreEnhancer = compose(
    applyMiddleware(thunk),
    window.devToolsExtension && window.devToolsExtension()

)

const store = createStore(reducer,
    allStoreEnhancer
);

export default store;