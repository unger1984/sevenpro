import React from 'react'
import {connect} from 'react-redux'
import {array, number, func} from 'prop-types'

import './result.scss'
import ResultRow from "./ResultRow/ResultRow";
import { getSearch } from "../../ducks/search";

const Result = ({items, page, pages, getSearch}) => {

  if(!items || items.length<=0) return <div />

  console.log("items",items)
  return(
    <table id="countries-list" className="result">
      <thead>
      <tr>
        <td className="name">
          <div><span>Страна</span></div>
        </td>
        <td className="capacity-right">
          <div><span>Объем импорта товара страной</span>
            <div className="question already-opentip"></div>
          </div>
        </td>
        <td className="capacity">
          <div><span>Доля импорта из России</span>
            <div className="question already-opentip"></div>
          </div>
        </td>
        <td className="capacity">
          <div><span>Средний применяемый тариф</span>
            <div className="question already-opentip"></div>
          </div>
        </td>
        <td className="alert">
          <div><span>Примечания</span></div>
        </td>
      </tr>
      </thead>
      <tbody>
      {
        items.map((item,index)=><ResultRow key={`result_${index}`} item={item} />)
      }
      </tbody>
      <tfoot>
      {pages>page && <tr>
        <td colSpan="6" onClick={()=>getSearch()}>
          <div className="more">Показать еще 10 строк
          </div>
        </td>
      </tr>}
      </tfoot>
    </table>
  )
}

Result.propTypes = {
  items: array.isRequired,
  page: number.isRequired,
  pages: number.isRequired,
  getSearch: func.isRequired,
}

const mapStateToProps = state => ({
  items: state.search.items,
  page: state.search.page,
  pages: state.search.pages
})

const mapDispatchToProps = dispatch => ({
  getSearch: id => dispatch(getSearch(id)),
})

export default connect(mapStateToProps,mapDispatchToProps)(Result)
