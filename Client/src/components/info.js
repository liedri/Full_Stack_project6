import React from "react";

import { userContext } from "../App";
import { useContext, useState } from "react";

//import '../styles/info.css';

const Info = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const userInfo = useContext(userContext);
  const [userInfoState, setUserInfoState] = useState({});
  let temp = userInfo;

  onbeforeunload = (event) => { return event.returnValue = saveData };

  const saveData = () => {
    setUserInfoState(temp)
  }

  console.log(userInfo, "This is the userInfo data");
  console.log(userInfoState, "This is the userInfoState data");
  const { name, username, email, phone, website, address, company } = user;

  return (
    <div className="user_div">
      <div className="user_header">
        <h2>{name}</h2>
        <p><strong>Username:</strong> {username}</p>
      </div>
      <div className="user_details">
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Phone:</strong> {phone}</p>
        <p><strong>Website:</strong> {website}</p>
        <p><strong>Address:</strong> {address.street}, {address.suite}, {address.city} {address.zipcode}</p>
        <p><strong>Company:</strong> {company.name}</p>
      </div>
    </div>
  );

}

export default Info;