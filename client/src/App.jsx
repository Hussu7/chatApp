import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import MessageRoom from './pages/MessageRoom'
import Login from './pages/Login'
import Register from './pages/Register'


const App = () => {
  return (
 <BrowserRouter>
 <Routes>
    <Route path='/' element={<Homepage/>}></Route>
    <Route path='/messageroom/:id' element={<MessageRoom/>}></Route>
    <Route path='/login' element={<Login/>}></Route>
    <Route path='/register' element={<Register/>}></Route>
 </Routes>
 </BrowserRouter>
  )
}

export default App