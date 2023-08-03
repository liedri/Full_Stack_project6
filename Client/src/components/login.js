import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login_page.css';

const LoginPage = (props) => {
  const [formValue, setFormValue] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  //const [usersList, setUsersList] = useState([]);
  let [data, setData] = useState([]);


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValue((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleLogin = async(event) => {
    event.preventDefault();
    // Check if the provided username and password match any user in the usersList
    const fetchedData = await fetch(`http://localhost:3000/api/users?username=${formValue.username}&password=${formValue.password}`);
    const data = await fetchedData.json();
    console.log("client/log/data: ", data);
    setData(data);

    if (data) {
      localStorage.setItem('user', JSON.stringify(data[0]));
      navigate(`/application/${data[0].id}/info`);
    } else {
      alert('Username / password is wrong');
    }
  };

  // async function importData() {
  //   try {
  //     const fetchedData = await fetch(`http://localhost:3000/api/users/`);
  //     const data = await fetchedData.json();
  //     console.log('users data: ');
  //     setUsersList(data);
  //   } catch (error) {
  //     console.error('Error fetching users:', error);
  //   }
  // }

  return (
    <div className='open_window'>
      <h3 className='logo'>LOGO</h3>
      <div className='login_div'>
        <h2>welcome</h2>
        <h4>Please Log In</h4>
        <form onSubmit={handleLogin}>
          <div>
            <label>Username:</label>
            <input className='input' type="text" name="username" value={formValue.username} onChange={handleChange} />
          </div>
          <div>
            <label>Password:</label>
            <input className='input' type="password" name="password" value={formValue.password} onChange={handleChange} />
          </div>
          <button className='login_btn' type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
