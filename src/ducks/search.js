import api from '../api'

export const moduleName = 'search'

export const FETCH = `${moduleName}/FETCH`
export const SET_ID = `${moduleName}/SET_ID`
export const CLEAR = `${moduleName}/CLEAR`

const initialState = {
  items: [],
  page: 1,
  pages: 0,
  id: null
}

export default function searchReducer(state = initialState, action) {
  const {payload, type} = action

  switch (type) {
    case SET_ID:
      return {...state, id: payload.id}
    case FETCH:
      if(payload.isNext){
        return { ...state, items: [...state.items, ...payload.items], pages: payload.pages, page: payload.page }
      }else {
        return { ...state, items: payload.items, pages: payload.pages, page: payload.page }
      }
    case CLEAR:
      return  initialState
    default:
      return state
  }
}

export const setId = id => ({
  type: SET_ID,
  payload: {id}
})

export const fetchSearch = (items,pages,page,isNext) => ({
  type: FETCH,
  payload: {items,pages,page,isNext}
})

export const clearSearch = () => ({
  type: CLEAR
})

export const getSearch = newId => (dispatch, getState) => {
  if(newId) {
    dispatch(setId(newId))
  }
    const { page, id } = getState().search
    api.search(newId?newId:id, (page + (newId ? 0 : 1))).then(res => {
      dispatch(fetchSearch(res.items, res.pages, res.page, (newId?false:true)))
    })
}
