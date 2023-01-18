import logo from "./logo.svg"
import "./App.css"
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"

const Header = () => {
    const navigate = useNavigate()

    return (
        <div>
            <button
                onClick={() => {
                    navigate("/")
                }}
            >
                Home
            </button>
            <button
                onClick={() => {
                    navigate("/login")
                }}
            >
                Login
            </button>
            <button
                onClick={() => {
                    navigate("/register")
                }}
            >
                Register
            </button>
        </div>
    )
}

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
