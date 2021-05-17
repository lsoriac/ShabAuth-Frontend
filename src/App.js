import './App.css';
//npm i react-router-dom
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'; // Archivo Javascript de Bootstrap 4 

//Components
import Navigation from './Components/Navigation';
import Login from './Components/Login'
import Register from './Components/Register';
import Authentication from './Components/Authentication';
import IndexPage from './Components/IndexPage'
import ConfirmAuthentication from './Components/ConfirmAuthentication'

function App() {
  return (
    <Router>
        <Navigation/>
        <Route path="/" exact component={IndexPage} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/authentication" component={Authentication} />
          <Route path="/private-page" component={ConfirmAuthentication} />
    </Router>
  );
}


export default App;