import React from 'react'

import './result-row.scss'
import { urlBackend } from "../../../config";

const ResultRow = ({item}) => {

  const {COUNTRY,I5V, share, I9V, icons, id_reporter} = item
  const {alerts} = icons
  return(
    <tr className="result-row">
      <td className="name">
        <div><img src={`${urlBackend}/img/flags/4x3/${id_reporter.toLowerCase()}.svg`} /><span>{COUNTRY}</span></div>
      </td>
      <td className="capacity-right"><span dangerouslySetInnerHTML={{__html: I5V}} /></td>
      <td className="capacity"><span dangerouslySetInnerHTML={{__html: share}} /></td>
      <td className="capacity"><span dangerouslySetInnerHTML={{__html: I9V}} /></td>
      <td className="alert">
        <div className="icons">
          {alerts===1 && <div className="icon region-icon already-opentip">
            <div className="popup"></div>
          </div>}
        </div>
      </td>
    </tr>
  )
}

export default ResultRow
