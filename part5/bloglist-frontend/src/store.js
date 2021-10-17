import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { notificationReducer } from './reducers/notificationReducer'
import { blogReducer } from './reducers/blogReducer'
import thunk from 'redux-thunk'


const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
})


const store = createStore(reducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store
