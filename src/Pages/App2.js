import React, {
  useReducer,
  useContext,
  useCallback,
  useEffect,
  useState,
} from "react";

import styles from "./App2.module.css";
import LogContext from "../store/login-context";
import AcountContext from "../store/acount-context";

const Normalna = {
  username: "",
  password: "",
  isValidU: null,
  isValidP: null,
  allValid: false,
  isTaken: false,
};

function userReducer(state, action) {
  if (action.type === "NAME_INPUT") {
    const isValid = action.val.trim().length > 1;
    const oValid = isValid && state.isValidP;

    return {
      ...state,
      username: action.val,
      isValidU: isValid,
      allValid: oValid,
    };
  } else if (action.type === "PASSWORD_INPUT") {
    const isValid = action.val.trim().length > 6;
    const oValid = isValid && state.isValidU;
    return {
      ...state,
      password: action.val,
      isValidP: isValid,
      allValid: oValid,
    };
  }
  if (action.type === "ALL_VALID") {
    return { ...state, allValid: true };
  }
  if (action.type === "NO_VALID") {
    return { ...state, allValid: false };
  }
}

function App2() {
  const [userData, dispatchUserData] = useReducer(userReducer, Normalna);
  const [currentUsers, setCurrentUsers] = useState();
  const [askSignUp, setAskSignUp] = useState(false);

  const logCtx = useContext(LogContext);
  const acCtx = useContext(AcountContext);

  const fetchUsersHandler = useCallback(async () => {
    const response = await fetch(
      "https://react-http-6a8e0-default-rtdb.firebaseio.com/userData.json"
    );

    const data = await response.json();

    const loadedUsers = [];

    for (const key in data) {
      loadedUsers.push({
        id: key,
        username: data[key].username,
        password: data[key].password,
      });
    }
    setCurrentUsers(loadedUsers);
  }, []);

  async function addUserHandler(user) {
    const response = await fetch(
      "https://react-http-6a8e0-default-rtdb.firebaseio.com/userData.json",
      {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "aplication/json",
        },
      }
    );

    const data = await response.json();
  }

  useEffect(() => {
    fetchUsersHandler();
  }, [fetchUsersHandler]);

  function usenameChangeHandler(event) {
    dispatchUserData({ type: "NAME_INPUT", val: event.target.value });
  }

  function passwordChagneHandler(event) {
    dispatchUserData({ type: "PASSWORD_INPUT", val: event.target.value });
  }

  function validateAll(kind) {
    let done = null;
    currentUsers.map((user) => {
      if (
        user.username === userData.username &&
        user.password === userData.password && kind === "log"
      ) {
        acCtx.changeData(userData.username, userData.password);
        logCtx.onEndLogIn();
      } else if (user.username !== userData.username && (kind !== "log" || askSignUp === false )) {
        done=false;
      }
    
    });
    if(done === false){
      if (askSignUp) {
        const userToAdd = {
          username: userData.username,
          password: userData.password,
        };
        addUserHandler(userToAdd);
        acCtx.changeData(userData.username, userData.password)
        logCtx.onEndLogIn();
      } else {
        setAskSignUp(true);
      } 
    } 
  }

  function onSubmit(event) {
    event.preventDefault();
    validateAll("log");
  }
  function onSignUpHandler() {
    validateAll();
  }

  return (
    <React.Fragment>
      <form onSubmit={onSubmit} className={styles.form}>
        <section
          className={`${styles.userS} ${
            userData.isValidU === false && styles.invalid
          } `}
        >
          <label>Username:</label>
          <input onChange={usenameChangeHandler} type="text" />
        </section>
        <section
          className={`${styles.passS} ${
            userData.isValidP === false && styles.invalid
          } `}
        >
          <label> Password:</label>
          <input onChange={passwordChagneHandler} type="password" />
        </section>
        <section>
          <button
            className={styles.btn}
            type="submit"
            disabled={!userData.allValid}
          >
            Log-in
          </button>
          {askSignUp && (
            <button
              onClick={onSignUpHandler}
              className={styles.btn}
              type="button"
              disabled={!userData.allValid}
            >
              Sign-up
            </button>
          )}
        </section>
      </form>
      {askSignUp && <p>No acount found, would you like to sign up?</p>}
    </React.Fragment>
  );
}

export default App2;
