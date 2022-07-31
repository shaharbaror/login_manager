import React, { useState, useEffect } from "react"
const AcountContext = React.createContext({
    username:'',
    password:'',
    changeData: (username, password) => {}
})

export function AcountProvider(props) {

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');

    useEffect(() => {
        if(localStorage.getItem("username")){
            setUsername(localStorage.getItem("username")); //Needs to conect to acount again
        }
    })

    function onChangeDataHandler(username = null,password = null){
        if(username !== null){
            setUsername(username);
            localStorage.setItem("username",username);
        }
        if(password !== null){
            setPassword(password);
        }
    }

    const acount = {
        username: username,
        password:password,
        changeData: onChangeDataHandler
    };


    return <AcountContext.Provider value={acount}>{props.children}</AcountContext.Provider>;
}

export default AcountContext;