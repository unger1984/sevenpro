import api from '../api'

export const moduleName = 'suggest'

export const FETCH = `${moduleName}/FETCH`
export const CLEAR = `${moduleName}/CLEAR`

const initialState = []

export default function suggestReducer(state = initialState, action) {
  const {payload, type} = action

  switch (type) {
    case FETCH:
      return payload.data
    case CLEAR:
      return  initialState
    default:
      return state
  }
}

export const fetchSuggest = data => ({
  type: FETCH,
  payload: {data}
})

export const clearSuggest = () => ({
  type: CLEAR
})

export const getSuggest = text => dispatch => {
  api.suggest(text).then(res=>{
    dispatch(fetchSuggest(res.data))
  })
}
