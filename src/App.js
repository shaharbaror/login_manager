import { useContext, useEffect, useState } from "react";
import { Route, Routes,useNavigate } from "react-router-dom";

import React from "react";
import Header from "./components/header/Header";
import LogContext from "./store/login-context";

import App2 from "./Pages/App2";
import Home from "./Pages/Home";

function App() {
  const [thePath, setThePath] = useState("/");
  const logCtx = useContext(LogContext);

  const navigator = useNavigate();

  const isToLog = logCtx.goToLogIn;


  useEffect(() => {
    if(isToLog) {
      navigator('/login',{replace:true});
    } else {
      navigator('/',{replace:true});
    }
  },[isToLog]);


  return (
    <React.Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<App2 />} />
      </Routes>
      
    </React.Fragment>
  );
}

export default App;
