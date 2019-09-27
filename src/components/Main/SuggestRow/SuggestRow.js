import React from 'react'
import {object, func, oneOfType} from 'prop-types'

import './suggest-row.scss'

const SuggestRow = ({onClick,item}) => {

  const {id,name, byCustomsDeclaration, byName} = item
  return(
    <tr className="suggest-row" onClick={onClick}>
      <td className="code">{id}</td>
      <td className="description">
        <span>{name}</span>
        {byCustomsDeclaration && <div className="type">Практика</div>}
        {byName && <div className="type">ТН ВЭД</div>}
      </td>
    </tr>
  )
}

SuggestRow.propTypes = {
  onClick: func.isRequired,
  item: object.isRequired,
}

export default SuggestRow
