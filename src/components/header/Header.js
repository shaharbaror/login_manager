import styles from './Header.module.css';
import LogInBtn from '../logIn/LogInBtn';

function Header() {

    return <header className={styles.header}>
        <div className={styles.logo}>
            <h1 >Logo</h1>
        </div>
            <LogInBtn />
    </header>
}

export default Header;