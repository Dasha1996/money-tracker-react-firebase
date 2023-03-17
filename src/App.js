import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import Navbar from './components/Navbar';

import './App.css';

import Home from "./pages/home/Home";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";

function App() {
  const { user, authIsReady } = useAuthContext();
  return (
    <div className="App">
   {authIsReady && 
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path ="/" element = {user ? <Home/> : <Navigate to = "/login"/> }/>
          <Route path = "/signup" element = {!user?<Signup/>: <Navigate to="/"/>}/>
          <Route path = "/login" element = {!user ? <Login/> : <Navigate to = "/"/> } />
        </Routes>
      </BrowserRouter>
    }
    </div>
  );
}

export default App;
