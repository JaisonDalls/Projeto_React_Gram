import './App.css';
import Home from './pages/Home/Home';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';

//Router
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
   <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
        </Routes>
      </BrowserRouter>
   </div>
  );
}

export default App;
