import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [usernameReg, setUsernameReg] = useState('');
  const [passwordReg, setPasswordReg] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(false);

  const onRegClick = () => {
    axios
      .post('http://localhost:3001/register', {
        username: usernameReg,
        password: passwordReg,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onLoginClick = () => {
    axios
      .post('http://localhost:3001/login', {
        username: username,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        setLoginStatus(response.data.bool);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      {/* LOGIN */}
      <div className="logres">
        <h1>LOGIN</h1>
        <div className="inputBox">
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={onLoginClick}>Login</button>
      </div>

      {/* REGISTER */}
      <div className="logres">
        <h1>REGISTER</h1>
        <div className="inputBox">
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsernameReg(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPasswordReg(e.target.value)}
          />
        </div>
        <button onClick={onRegClick}>Register</button>
      </div>

      {/* CONTENT WHEN LOGGED IN */}
      {loginStatus && <div>im in</div>}
    </div>
  );
}

export default App;
