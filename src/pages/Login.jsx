import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { login } from "../api/authApi"

export default function Login() {
    const [id, setId] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const attemptLogin = async () => {
        const res = await login(id, password)
        if (!res) {
            alert("Login failed")
            return
        }

        alert("Login succeeded")
        navigate("/")
    }

    return (
        <>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    attemptLogin()
                }}
            >
                <input
                    placeholder="ID"
                    value={id}
                    onChange={(e) => {
                        setId(e.target.value)
                    }}
                />
                <input
                    placeholder="PW"
                    value={password}
                    type="password"
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                />
                <button type="submit">Login</button>
            </form>
        </>
    )
}
