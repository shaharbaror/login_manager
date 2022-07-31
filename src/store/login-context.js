import React, { useState } from "react"

const LogContext = React.createContext({
    isLogedIn:false,
    goToLogIn:false,
    onStartLogIn: () => {},
    onEndLogIn: () => {},
});

export function LogProvider(props) {

    const [isLogged,setIsLogged] = useState(false);
    const [isGoToLog,setIsGoToLog] = useState(false);

    function onStartLogInHandler() {
        setIsGoToLog(true);
    }
    function onEndLogInHandler() {
        setIsGoToLog(false);
        setIsLogged(true);
    }
    

    const logs = {
        isLoggedIn:isLogged,
        goToLogIn:isGoToLog,
        onStartLogIn:onStartLogInHandler,
        onEndLogIn:onEndLogInHandler
    }

    return <LogContext.Provider value={logs} >{props.children}</LogContext.Provider>
}

export default LogContext;