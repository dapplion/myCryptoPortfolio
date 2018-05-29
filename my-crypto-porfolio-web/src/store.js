import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import db from './utils/db'
import { updateAccounts } from './actions/accountActions'

const initialState = {}

const logger = store => next => action => {
  let result = next(action)
  if (typeof action === "object" && action.upload) {
    console.log('UPLOADING!!')
    db.put(JSON.stringify(store.getState()))
  }
  return result
}

const middleware = [logger, thunk]

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

// store.subscribe(() => {
//   // Forwarding all changes to the server
//
// })

db.sub((data) => {
  store.dispatch(updateAccounts(data))
})

export default store
