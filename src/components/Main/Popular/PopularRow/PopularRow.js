import React from 'react'
import {number, string, func, oneOfType} from 'prop-types'

import './popular-row.scss'

const PopularRow = ({onClick,id,name}) => {
  return(
    <tr className="popular-row" onClick={onClick}>
      <td className="code">{id}</td>
      <td className="description">
        <div>{name}</div>
      </td>
    </tr>
  )
}

PopularRow.propTypes = {
  onClick: func.isRequired,
  id: oneOfType([number,string]).isRequired,
  name: string.isRequired,
}

export default PopularRow
