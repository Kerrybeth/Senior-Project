
import './App.css';
import NavbarComp from './ui/components/navbar.js'
function App() {
  return (
    <div className="App">
      <header className="App-header">
      	   <Displaynav />
	  </header>
    </div>
  );
}

function Displaynav() {
return(
<NavbarComp />
);}


export default App;