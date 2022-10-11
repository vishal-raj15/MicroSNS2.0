import React, { useState } from "react";
import axios from "axios";
import { useHistory, NavLink, useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const history = useHistory();

  const Register = async (e) => {
    console.log(username);
    console.log(name);
    console.log(email);
    console.log(password);
    console.log(" registereing ........ ");
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/api/users/addUser", {
        name: name,
        username: username,
        email: email,
        password: password,
      });
      history.push("/");
      console.log(" registered successfully ");
    } catch (error) {
      console.log(error);
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
              <form onSubmit={Register} className="box">
                <p className="has-text-centered">{msg}</p>

                <div className="field mt-2">
                  <div className="controls">
                    <input
                      type="text"
                      className="input"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-2">
                  <div className="controls">
                    <input
                      type="text"
                      className="input"
                      placeholder="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>

                {/* <div className="field mt-2">
                  <div className="controls">
                    <input
                      type="text"
                      className="input"
                      placeholder="last name"
                      value={last_name}
                      onChange={(e) => setLast_name(e.target.value)}
                    />
                  </div>
                </div> */}

                <div className="field mt-2">
                  <div className="controls">
                    <input
                      type="text"
                      className="input"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-2">
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

                <div className="field mt-2">
                  <button className="button is-success is-fullwidth">
                    Register
                  </button>

                  <p className="mt-3">
                    Have an Account ?{" "}
                    <span>
                      <NavLink to="/" style={{ textDecoration: "none" }}>
                        SignIn
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

export default Register;
