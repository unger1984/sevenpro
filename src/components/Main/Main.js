import React, {useState} from 'react';
import {func,array} from 'prop-types'
import { connect } from 'react-redux';

import './main.scss'
import Popular from "./popular/Popular";
import { getSuggest, clearSuggest } from "../../ducks/suggest";
import SuggestRow from "./SuggestRow/SuggestRow";
import { clearSearch, getSearch, setId } from "../../ducks/search";
import Result from "../Result/Result";

const Main = ({suggest, getSuggest, clearSuggest, clearSearch, getSearch}) => {
  const [searchItem,setSearchItem] = useState({id: null, name: null})

  const handleTypeText = text => {
    setSearchItem({id:null, name: text})
    if(text.trim().length<=0) clearSuggest()
    else getSuggest(text)
  }

  const setSelect = item => {
    setSearchItem(item)
    clearSuggest()
  }

  const search = () => {
    if(searchItem.id){
      clearSearch()
      getSearch(searchItem.id)
    }
  }

  return(
    <div className="main">
      <div className="container">
        <ul className="breadcrumb">
          <li><a href="/">Главная</a></li>
          <li><a href="/">Навигатор экспортера</a></li>
        </ul>
        <div className="caption">Навигатор экспортера</div>
        <div className="descr">Начните с поиска целевого рынка для экспортной поставки товаров</div>
        <div className="search">
          <div className="arrow"></div>
          <div className="label-box">
            <div className="box">
              <div className={`code ${searchItem.id?'active':''}`}>{searchItem.id?searchItem.id:''}</div>
              <input value={searchItem.name?searchItem.name:''} onChange={e=>handleTypeText(e.target.value)} type="text" placeholder="Введите код ТН ВЭД или название товара" autoComplete="off" />
            </div>
            {suggest && suggest.length>0 && <div className="search-results">
              <table className="table">
                <tbody>
                {
                  suggest.map(item=><SuggestRow key={`suggest_${item.id}`} item={item} onClick={()=>setSelect(item)} />)
                }
                </tbody>
              </table>
            </div>}
          </div>
          <button className={`${searchItem.id?'active':'disabled'}`} onClick={search}>Подобрать страны</button>
        </div>
        <Popular onSelect={({id,name})=>setSearchItem({id,name})} />
      </div>
    </div>
  )
}

Main.propTypes = {
  suggest: array.isRequired,
  getSuggest: func.isRequired,
  clearSuggest: func.isRequired,
  getSearch: func.isRequired,
  clearSearch: func.isRequired,
}

const mapStateToProps = state => ({
  suggest: state.suggest
})

const mapDispatchToProps = dispatch => ({
  getSuggest: text => dispatch(getSuggest(text)),
  clearSuggest: () => dispatch(clearSuggest()),
  getSearch: id => dispatch(getSearch(id)),
  clearSearch: () => dispatch(clearSearch()),
})

export default connect(mapStateToProps,mapDispatchToProps)(Main)
