import Footer from "../Footer/Footer";
import Listing from "../Listing/Listing";
import React, { useState } from "react";
import "./Login.css";
import { handleLoginAdmin } from "../../apiCalls/admin";
import { useContext } from "react";
import { AppContext } from "../../context/globalContext";
import {useNavigate} from 'react-router-dom'

const Login = () => {
  const [err, setErr] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigator = useNavigate()

  const {isAdmin, setIsAdmin} = useContext(AppContext)


  const handleFormSubmit = async (e) => {
    e.preventDefault()

    try{
      const loginRes = await handleLoginAdmin(email, password)

      if(loginRes.success){
        alert("Logged in Successfully")
        setIsAdmin(true)
        navigator("/admin/pools")
      }else{
        alert(loginRes.reason)
        setIsAdmin(false)
      }

    }

    catch(error){
      console.log(error)
      alert("There was an error while logging in ")
    }

    //Your logic here
  }
  return (
    <main className="main">
      {/* <Listing /> */}
      <div className="mc">
        <div className="mc-b login-wrp">
          <span className="als">Admin Login</span>

         <form action="##" onSubmit={handleFormSubmit}>
         <div className="text-row">
            <div className="title">
              <label htmlFor="email">Email</label>
            </div>
            <input
              id="email"
              type="text"
              placeholder="example@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="text-row">
            <div className="title">
              <label htmlFor="email">Password</label>
            </div>
            <input
              id="email"
              type="password"
              placeholder="******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {err && (
            <>
              <span className="lg-err">{err}</span>
            </>
          )}

          <button className="submit">Submit</button>
         </form>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Login;
