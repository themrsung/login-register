import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { addUser, login } from "../api/authApi"

export default function Register() {
    const [id, setId] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const attemptRegister = async () => {
        const res = await addUser(id, password)
        if (!res) {
            alert("Register Succeeded")
            return
        }

        const loginRes = await login(id, password)
        if (!loginRes) {
            alert("Login Failed")
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
                    attemptRegister()
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
                <button type="submit">Register</button>
            </form>
        </>
    )
}
