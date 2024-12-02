import './App.css';
import Auth from './pages/Auth';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Notfound from './pages/Notfound';

function App() {

  const token = localStorage.getItem("token") || "";

  return (
    <div className="App">
      <Router>
      <ToastContainer/>
        <Routes>
          <Route path='/' element={<Auth/>}/>
         { token && <Route path='/dashboard' element={<Dashboard/>}/>}
          <Route path='*' element={<Notfound/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
