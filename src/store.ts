import { createStore } from 'redux'
import { useSelector, TypedUseSelectorHook } from 'react-redux'

type state = {
  sidebarShow: 'responsive' | boolean
}

const initialState: state = {
  sidebarShow: 'responsive'
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type args = { type?: string, [key: string]: any }

const changeState = (state = initialState, { type, ...rest }: args) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    default:
      return state
  }
}

const store = createStore(changeState)
export default store

// https://react-redux.js.org/using-react-redux/static-typing#typing-the-useselector-hook
export const useTypedSelector: TypedUseSelectorHook<state> = useSelector
