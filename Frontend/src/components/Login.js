import React, { useState } from "react";
import axios from "axios";
import { useHistory, NavLink, useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const history = useHistory();

  const Auth = async (e) => {
    e.preventDefault();
    try {
      const auth = await axios.post("http://localhost:3001/api/users/login", {
        username: username,
        password: password,
      });
      history.push("/dashboard");
      console.log(" done   -------------------------");
      return auth;
    } catch (error) {
      console.log(error, "   -------------------------");

      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4-desktop">
              <form onSubmit={Auth} className="box">
                <p className="has-text-centered">{msg}</p>
                <div className="field mt-5">
                  <div className="controls">
                    <input
                      type="text"
                      className="input"
                      placeholder="username or email"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <div className="controls">
                    <input
                      type="password"
                      className="input"
                      placeholder="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-5 ">
                  <button className="button is-success is-fullwidth">
                    Login
                  </button>
                  <p className="mt-3">
                    Need an Account ?{" "}
                    <span>
                      <NavLink
                        to="/register"
                        style={{ textDecoration: "none" }}
                      >
                        SignUp
                      </NavLink>
                    </span>{" "}
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
