import { BrowserRouter, Route, Switch } from "react-router-dom";
// import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Index from "./components/index";
import "./App.css";

import { RecoilRoot, atom } from "recoil";

function App() {
  return (
    <div className="App" style={{}}>
      <RecoilRoot>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/dashboard">
              <Index />
            </Route>
          </Switch>
        </BrowserRouter>
      </RecoilRoot>
    </div>
  );
}

export default App;
