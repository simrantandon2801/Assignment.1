import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Form from './Form';
import Login from './Login';
import Contact from './Contact';
import Mobileheader from './Mobileheader';
import Homepage from './Homepage';
import Table from './Table';

function App() {
  return (
    <>
     <Routes>
       
       <Route path='/'element={<Form/>}/>
       <Route path='/Login'element={<Login/>}/>
       <Route path='/home'element={<Contact/>}/>
       
       <Route path='/Mobileh'element={<Mobileheader/>}/>
       <Route path='/homepage'element={<Homepage/>}/>
       <Route path='/table'element={<Table/>}/>
      </Routes> 
    </>
  );
}

export default App;
