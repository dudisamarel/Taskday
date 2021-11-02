import { TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { userService } from "../service/userService";
import register from "../../../assets/imgs/register.png";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import toasting from "../../../shared/services/toasting";



export const LoginSignup = () => {
  // const strongPasswordRegex = useRef(
  //   new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})")
  // );
  const [loginCred, setLoginCred] = useState({
    username: "",
    password: "",
  });
  const [signupCred, setSignupCred] = useState({
    fullname: "",
    username: "",
    password: "",
  });




  const history = useHistory();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [logSignToggler, setLogSignToggler] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    userService.getLoggedinUser().then((user) => {
      setLoggedInUser(user)
      setMounted(true)
    })
  }, [setMounted])

  const onChangeHandler = (ev) => {
    const { name, value } = ev.target;
    logSignToggler
      ? setLoginCred({ ...loginCred, [name]: value })
      : setSignupCred({ ...signupCred, [name]: value });
  };

  const doLogin = async (ev) => {
    ev.preventDefault();
    const { username, password } = loginCred;
    if (!username || !password) {
      toasting(0, "Please enter username or password")
      return;
    }
    userService
      .login(loginCred)
      .then((user) => {
        setLoginCred({ username: "", password: "" });
        setLoggedInUser(user);
        history.push("/board");
      })
      .catch((err) => {
        toasting(0, err)
      });
  };

  const guestLogin = async (ev) => {
    userService
      .login({
        username: "guest",
        password: "guest",
      })
      .then((user) => {
        setLoginCred({ username: "", password: "" });
        setLoggedInUser(user);
        history.push("/board");
      })
      .catch((err) => {
        toasting(0, err)
      });
  };

  const doLogout = () => {
    userService
      .logout()
      .then((msg) => {
        toasting(1, msg)
        setLoggedInUser(null);
      })
      .catch((err) => {
        toasting(0, err)
      });
  };

  const clearInputs = () => {
    setSignupCred({ fullname: "", username: "", password: "" });
    setLoginCred({ username: "", password: "" });
  };
  const doSignup = async (ev) => {
    ev.preventDefault();
    const { username, password, fullname } = signupCred;
    // (?=.*[a-z])	The string must contain at least 1 lowercase alphabetical character
    // (?=.*[A-Z])	The string must contain at least 1 uppercase alphabetical character
    // (?=.*[0-9])	The string must contain at least 1 numeric character
    // (?=.*[!@#$%^&*])	The string must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict
    // (?=.{8,})	The string must be eight characters or longer

    // if (!password.match(strongPasswordRegex)) {
    //   setMsg("Password is not strong enough");
    //   return;
    // }
    if (!username || !password || !fullname) {
      toasting(0, "one or more of the inputs are empty")
    } else
      userService
        .signup(signupCred)
        .then((user) => {
          setSignupCred({ fullname: "", username: "", password: "" });
          setLoggedInUser(user);
          history.push("/board");
        })
        .catch((err) => toasting(0, err));
  };





  return mounted && (
    <section className="background-div">
      <ToastContainer
        limit={2}
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="first-level-wrapper">
        <div className="img-container">
          <img src={register} alt="office" />
        </div>
        {(loggedInUser ?
          (
            <div className="flex column justify-space-around">
              <h1> Hello {loggedInUser.fullname}</h1>
              <button className="rounded" onClick={doLogout}>Logout</button>
            </div>
          ) : (
            <div className="login">
              <div className="flex justify-center">
                {logSignToggler ? (
                  <h1>Taskday</h1>
                ) : (
                  <h1>Join Taskday</h1>
                )}
              </div>
              {logSignToggler ? (
                <div>
                  <TextField
                    style={{ width: "100%", margin: "3% 0 0 0 " }}
                    variant="outlined"
                    type="text"
                    name="username"
                    value={loginCred.username}
                    onChange={onChangeHandler}
                    label={"username"}
                  />
                  <br />
                  <TextField
                    style={{ width: "100%", margin: "3% 0 0 0 " }}
                    name="password"
                    type="password"
                    variant="outlined"
                    value={loginCred.password}
                    onChange={onChangeHandler}
                    label={"password"}
                  />
                  <div className="spacer" />
                  <div className="flex column">

                    <div className="login-buttons">
                      <button
                        onClick={() => {
                          clearInputs();
                          setLogSignToggler(false);
                        }}
                        className="register-btn"
                      >
                        Register Here
                      </button>
                      <button className="rounded" onClick={doLogin}>
                        Continue
                      </button>
                    </div>
                    <button className="guest-btn" onClick={guestLogin}>
                      Login as a guest
                    </button>
                  </div>
                </div>
              ) : (
                <div className="sign-up">
                  <form className="flex column justify-center" onSubmit={doSignup}>
                    <TextField
                      style={{ width: "100%", margin: " 10px  0 10px 0 " }}
                      type="text"
                      name="fullname"
                      variant="outlined"
                      value={signupCred.fullname}
                      onChange={onChangeHandler}
                      label={"Full name"}
                    />
                    <TextField
                      style={{ width: "100%", margin: " 0  0 10px 0 " }}
                      variant="outlined"
                      type="text"
                      name="username"
                      value={signupCred.username}
                      onChange={onChangeHandler}
                      label={"username"}
                    />
                    <TextField
                      style={{ width: "100%", margin: " 0  0 3% 0 " }}
                      variant="outlined"
                      name="password"
                      type="password"
                      value={signupCred.password}
                      onChange={onChangeHandler}
                      label={"password"}
                    />
                    <button
                      type="sumbit"
                      className="rounded"
                    >
                      Continue
                    </button>
                    <div className="spacer" />
                    <h4>
                      Already a member?
                      <span
                        className="signin-route-span"
                        onClick={() => {
                          clearInputs();
                          setLogSignToggler(true);
                        }}
                      >
                        Sign In
                      </span>
                    </h4>
                  </form>
                </div>
              )}
            </div>
          ))}
      </div>

    </section>
  )
};
