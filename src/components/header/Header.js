import React from 'react'
import './header.scss'

const Header = () => {
  
  return(
    <div className="header">
      <div className="header__wrapper">
        <div className="header__top">
          <div className="header__left"><a className="header__logo" href="https://www.exportcenter.ru/"
                                                rel="noreferrer noopener"></a>
            <div className="header__wrap-add-logos"><a className="header__logo-eksar"
                                                            href="http://www.exiar.ru/" target="_blank"
                                                            rel="noreferrer noopener"></a><br /><a
              className="header__logo-roseksimbank" href="http://eximbank.ru/" target="_blank"
              rel="noreferrer noopener"></a>
            </div>
            <a className="header__phone" href="tel:8-800-550-01-88">8-800-550-01-88</a>
          </div>


          <div className="header__right"><a className="header__office" href="/user/login/">Войти</a></div>

        </div>
        <div className="header__bottom">
          <div className="header__left"></div>
          <div className="header__right"></div>
        </div>
      </div>
    </div>
  )
}

export default Header;
