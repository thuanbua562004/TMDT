import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlider'

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
})