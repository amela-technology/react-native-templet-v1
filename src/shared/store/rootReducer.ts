import { combineReducers } from 'redux'
import resource from './resource/reducer'
import authentication from './authentication/reducer'

const rootReducer = combineReducers({
    resource,
    authentication,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
