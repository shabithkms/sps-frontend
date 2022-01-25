import './App.css';
import {Routes,Route} from 'react-router'
import Login from './Pages/AdminLogin'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/admin/login' element={<Login/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
