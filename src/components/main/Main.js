import React from 'react';

import './main.scss'

const Main = () => {

  return(
    <div className="main">
      <div className="container">
        <ul className="breadcrumb">
          <li><a href="/">Главная</a></li>
          <li><a href="/">Навигатор экспортера</a></li>
        </ul>
        <div className="caption">Навигатор экспортера</div>
        <div className="descr">Начните с поиска целевого рынка для экспортной поставки товаров</div>
        <form id="search" className="search">
          <div className="arrow"></div>
          <div className="label-box">
            <div className="box">
              <div className="code"></div>
              <input id="search" type="text" placeholder="Введите код ТН ВЭД или название товара" autoComplete="off" />
            </div>
            <div className="search-results">
              <table className="table">
                <tbody>
                <tr className="">
                  <td className="code">821420</td>
                  <td className="description"><span>Маникюрные инструменты</span> 
                    <div className="type">Практика</div>
                  </td>
                </tr>
                <tr className="">
                  <td className="code">271019</td>
                  <td className="description"><span>Средние и тяжелые дистилляты</span> 
                    <div className="type">Практика</div>
                  </td>
                </tr>
                <tr className="">
                  <td className="code">845390</td>
                  <td className="description"><span>Части оборудования для работы с кожей и обувью</span> 
                    <div className="type">Практика</div>
                  </td>
                </tr>
                <tr className="">
                  <td className="code">380993</td>
                  <td className="description"><span>Отделочные средства (кроме крахмалистых) для кожевенной промышленности</span> 
                    <div className="type">Практика</div>
                  </td>
                </tr>
                <tr className="">
                  <td className="code">842199</td>
                  <td className="description"><span>Части фильтровального оборудования</span> 
                    <div className="type">Практика</div>
                  </td>
                </tr>
                <tr className="">
                  <td className="code">854511</td>
                  <td className="description"><span>Угольные электроды для печей</span> 
                    <div className="type">Практика</div>
                  </td>
                </tr>
                <tr className="">
                  <td className="code">731010</td>
                  <td className="description"><span>Емкости из черных металлов от 50 до 300 л</span> 
                    <div className="type">Практика</div>
                  </td>
                </tr>
                <tr className="">
                  <td className="code">851629</td>
                  <td className="description"><span>Нагреватели пространства, кроме теплоаккумулирующих</span> 
                    <div className="type">Практика</div>
                  </td>
                </tr>
                <tr className="">
                  <td className="code">901839</td>
                  <td className="description"><span>Катетеры и схожие изделия</span> 
                    <div className="type">Практика</div>
                  </td>
                </tr>
                <tr className="">
                  <td className="code">901890</td>
                  <td className="description"><span>Прочие медицинские приборы и инструменты</span> 
                    <div className="type">Практика</div>
                  </td>
                </tr>
                <tr className="">
                  <td className="code">903180</td>
                  <td className="description">
                    <span>Прочие неоптические измерительные и контрольные приборы</span> 
                    <div className="type">Практика</div>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <input type="submit" value="Подобрать страны" disabled="disabled" className="disabled" />
        </form>
      </div>
    </div>
  )
}

export default Main
