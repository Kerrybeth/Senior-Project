import './App.css';
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';



function App() {
  return (
    <div className="App">
		<header className="App-header">
		<Router>
			<Suspense fallback={<div>Loading...</div>}>
			<Link to="/"> Home </Link>	
			</Suspense>
		</Router>
		</header>
    </div>
  );
}



export default App;
