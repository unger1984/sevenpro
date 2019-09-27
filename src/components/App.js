import React, { useState } from 'react';

import './app.scss'
import Header from "./header/Header";
import Main from "./main/Main";

const App = () => {
	return (<div className="app">
		<Header />
		<Main />
	</div>)
};

export default App;
