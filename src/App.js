import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from "./pages/Register/Register.js";
import Login from "./pages/Login/Login.js";
import Chat from "./pages/Chat/Chat.js";

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/chat" component={Chat} />
    </Router>
  );
};

export default App;
