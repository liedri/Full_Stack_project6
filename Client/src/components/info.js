import React, { useEffect } from "react";
import { useState } from "react";

//import '../styles/info.css';

function Info() {
  console.log("info page---------");
  let [data, setData] = useState([]);

  async function fetching() {
    const user_id = JSON.parse(localStorage.getItem('user')).id;
    const fetchedData = await fetch(`http://localhost:3000/api/info?userId=${user_id}`);
    const data2 = await fetchedData.json();
    setData(data2[0]);
  }
  
  onbeforeunload = (event) => { return event.returnValue = saveData };

  const saveData = () => {
    setData(data)
  }

  useEffect(
    () => {
      fetching();
    },[]
  )

  const { firstName, lastName, username, email, phone } = data;

  return (
    <div className="user_div">
      <div className="user_header">
        <h2>{firstName} {lastName}</h2>
        <p><strong>Username:</strong> {username}</p>
      </div>
      <div className="user_details">
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Phone:</strong> {phone}</p>
      </div>
    </div>
  );

}

export default Info;