import React, { useState } from 'react';
import axios from 'axios';



function Auth() {
  const [input, setInput] = useState({
    email: '',
    name: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const {name, value} = e.target;

    setInput(prevInput => {
      return {
        ...prevInput,
        [name]: value
      }
    })
  };

    const handleFormSubmit = (e) => {
      e.preventDefault();
      
      const newUser = {
        email: input.email,
        name: input.name,
        password: input.password
      }
      
      axios.post('https://little-a-app.herokuapp.com/create', newUser);

      clear();

  };

  const clear = () => {
    setInput({ email: '', name: '', password: '' });
  }

  return (
    <div>
      <form className="form">
        <input
          value={input.email}
          name="email"
          onChange={handleInputChange}
          type="email"
          placeholder="email"
        />
        <input
          value={input.name}
          name="name"
          onChange={handleInputChange}
          type="text"
          placeholder="name"
        />
        <input
          value={input.password}
          name="password"
          onChange={handleInputChange}
          type="password"
          placeholder="Password"
        />
        <button type="button" onClick={handleFormSubmit}>Submit</button>
      </form>
      {/* {errorMessage && (
        <div>
          <p className="error-text">{errorMessage}</p>
        </div>
      )} */}
    </div>
  );
}

export default Auth;