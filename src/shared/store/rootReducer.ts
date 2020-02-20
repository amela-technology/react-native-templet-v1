import {combineReducers} from 'redux'
import resource from './resource/reducer'
const rootReducer = combineReducers({
    resource,
})

export default rootReducer
