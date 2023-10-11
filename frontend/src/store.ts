import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { createBrowserHistory } from 'history'
import { combineReducers } from 'redux'
import { createReduxHistoryContext } from 'redux-first-history'

import { persistReducer, persistStore } from 'redux-persist'

import appReducer from './redux/app/slice'
import courseReducer from './redux/course/slice'
import storage from 'redux-persist/lib/storage'

// Setup redux-first-history
const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({ history: createBrowserHistory() })

const rootReducer = combineReducers({
  app: appReducer,
  course: courseReducer,
  router: routerReducer,
})
const persistConfig = {
  key: 'root',
  storage: storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  devTools: process.env.NODE_ENV === 'development' ? true : false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([routerMiddleware]),
  reducer: persistedReducer,
})

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)
export const history = createReduxHistory(store)
