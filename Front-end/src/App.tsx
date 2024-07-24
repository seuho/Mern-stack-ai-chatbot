import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import NotFound from './pages/NotFound'
import Chat from './pages/Chat'
import Login from './pages/Login'
import { useAuth } from './context/AuthContext'

function App() {
  const auth = useAuth();
  return <main>
    <Header />
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      {auth?.isLoggedIn && auth.user && (
          <Route path="/chat" element={<Chat />} />
        )}
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  </main>
}

export default App
