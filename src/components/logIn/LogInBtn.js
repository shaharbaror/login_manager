import styles from './LogInBtn.module.css';
import {useContext} from 'react';

import LogContext from '../../store/login-context';
import AcountContext from '../../store/acount-context';

function LogInBtn() {
    const acCtx = useContext(AcountContext);
    const logCtx = useContext(LogContext);

    function onLogInHandler() {
        logCtx.onStartLogIn();
    }

    return <div className={styles.background} >
        <button onClick={onLogInHandler}>Log-in</button>
        <h2>{acCtx.username}</h2>
        
        </div>
}

export default LogInBtn;