import React, {useEffect} from 'react'
import {func, array} from 'prop-types'
import { connect } from 'react-redux';

import './popular.scss'
import { getPopular } from "../../../ducks/popular";
import PopularRow from "./PopularRow/PopularRow";

const Popular = ({onSelect, getPopular, popular}) => {

  useEffect(()=>{
    getPopular()
  },[])

  return(
    <div className="popular">
      <div className="arrow"></div>
      <div className="title">Популярные запросы</div>

      <table id="popular-hs-list" className="table">
        <tbody>
        {
          popular.map(({id,name})=><PopularRow id={id} name={name} key={`popular_${id}`} onClick={()=>onSelect({id,name})} />)
        }
        </tbody>
      </table>

    </div>
  )
}

Popular.propTypes = {
  onSelect: func.isRequired,
  popular: array.isRequired,
  getPopular: func.isRequired,
}

const mapStateToProps = state => ({
  popular: state.popular,
})

const mapDispatchToProps = dispatch => ({
  getPopular: () => {
    dispatch(getPopular())
  },
})

export default connect(mapStateToProps,mapDispatchToProps)(Popular)
