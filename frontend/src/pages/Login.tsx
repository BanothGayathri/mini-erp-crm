import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/login.css";

function Login() {

    const navigate = useNavigate();

    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");

    const handleLogin=async()=>{

        try{

            const res=await api.post("/auth/login",{
                email,
                password
            });

            localStorage.setItem("token",res.data.token);

            alert("✅ Login Successful");

            navigate("/dashboard");

        }catch(error:any){

            alert(error.response?.data?.message || "Login Failed");

        }

    }

    return(

        <div className="login-container">

            <div className="login-card">

                <div className="logo">🚀</div>

                <h1 className="title">
                    Mini ERP CRM
                </h1>

                <p className="subtitle">
                    Welcome Back
                </p>

                <input
                    className="input"
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />

                <input
                    className="input"
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />

                <button
                    className="login-btn"
                    onClick={handleLogin}
                >
                    Login
                </button>

                <p className="footer">
                    © 2026 Mini ERP CRM
                </p>

            </div>

        </div>

    )

}

export default Login;