import {BrowserRouter, Routes, Route} from 'react-router-dom';
import RegisterPage from './pages/Register';
import LoginPage from './pages/Login';



function App() {
  return (
    <div className='text-white h-[100vh] flex justify-center items-center bg-cover' style={{"backgroundImage": "url(./src/assets/background.jpg)"}}>

      <Routes>
        <Route path="/" element={<h1>Home page</h1>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/home" element={<h1>Home</h1>} />
        <Route path="/profile" element={<h1>Profile</h1>} />
      </Routes>

    </div>
  )
}

export default App;
