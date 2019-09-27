import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'

import configureStore, { history } from './redux/configureStore'
import App from './components/App'
import './scss/index.scss'
import {initAPI} from 'api'

const store = configureStore()
initAPI(store)

render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<App/>
		</ConnectedRouter>
	</Provider>,
	document.getElementById('app'),
)

if (module.hot) {
	module.hot.accept()
}
