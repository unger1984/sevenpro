import api from '../api'

export const moduleName = 'popular'

export const FETCH = `${moduleName}/FETCH`

const initialState = []

export default function popularReducer(state = initialState, action) {
  const {payload, type} = action

  switch (type) {
    case FETCH:
      return payload.data
    default:
      return state
  }
}

export const fetchPopular = data => ({
  type: FETCH,
  payload: {data}
})

export const getPopular = () => dispatch => {
  api.popular().then(res=>{
    dispatch(fetchPopular(res.data))
  })
}
