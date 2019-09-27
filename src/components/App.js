import React, { useState } from 'react';

import './app.scss'
import Header from "./header/Header";
import Main from "./main/Main";
import Result from "./Result/Result";

const App = () => {
	return (<div className="app">
		<Header />
		<Main />
		<Result />
	</div>)
};

export default App;
