import React, { useState } from 'react';
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import '../styles/application.css';

function Application() {
  const user_id = JSON.parse(localStorage.getItem('user')).id
  const [linkPressed, setLinkPressed ] = useState(true);
  const navigate = useNavigate();


  const handleLogout = () => {
    navigate('/login');
      localStorage.removeItem("user");
  }

  const handleHide = () => {
    setLinkPressed(false);
  }

  return (
      <div className='open_div'>
          <div className="navbar">
          <h3 className='logo_app'>LOGO</h3>
              <div className="links_div">
                  <Link to={`/application/${user_id}/info`} className='link' onClick={handleHide}>Info</Link>
                  <span className="navbar__separator"></span>
                  <Link to={`/application/${user_id}/todos`} className='link' onClick={handleHide}>Todos</Link>
                  <span className="navbar__separator"></span>
                  <Link to={`/application/${user_id}/posts`} className='link' onClick={handleHide}>Posts</Link>
                  <span className="navbar__separator"></span>
                  <Link to={`/application/${user_id}/albums`} className='link' onClick={handleHide}>Albums</Link>
                  <span className="navbar__separator"></span>
                  <Link to='/login' onClick={handleLogout} className='logout_link'>Logout</Link>
              </div>
          </div>
          <div className="welcome_div">
            {linkPressed ? (
            <>
              <h1>Hello {JSON.parse(window.localStorage.getItem('user')).name}</h1>
              <p>
                Effortlessly manage tasks, posts, and photos all in one place.<br></br> 
                Stay organized, connected, and inspired.
              </p>
            </>
          ) : null}
          </div>
          <Outlet />
        </div>
  )
}

export default Application;