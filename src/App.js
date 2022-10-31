import React, { useEffect, useState } from "react";
import mailSvg from "./assets/mail.svg";
import manSvg from "./assets/man.svg";
import womanSvg from "./assets/woman.svg";
import manAgeSvg from "./assets/growing-up-man.svg";
import womanAgeSvg from "./assets/growing-up-woman.svg";
import mapSvg from "./assets/map.svg";
import phoneSvg from "./assets/phone.svg";
import padlockSvg from "./assets/padlock.svg";
import axios from "axios";

const url = "https://randomuser.me/api/";

function App() {
  const [user, setUser] = useState({});
  const [listData, setListdata] = useState([]);

  const getUser = async () => {
    const { data } = await axios(url);
    setUser(data.results[0]);
    console.log(data.results[0]);
  };

  const getList = () => {
    setListdata([...listData,{user}]);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <main>
      <div className="block bcg-orange">
      </div>
      <div className="block">
        <div className="container">
          <img
            src={user?.picture?.large}
            alt="random user"
            className="user-img"
          />
          <p className="user-title">My name is</p>
          <p className="user-value">
            {user?.name?.first} {user?.name?.last}
          </p>
          <div className="values-list">
            <button className="icon" data-label="name">
              <img src={womanSvg} alt="user" id="iconImg" />
            </button>
            <button className="icon" data-label="email">
              <img src={mailSvg} alt="mail" id="iconImg" />
            </button>
            <button className="icon" data-label="age">
              <img src={womanAgeSvg} alt="age" id="iconImg" />
            </button>
            <button className="icon" data-label="street">
              <img src={mapSvg} alt="map" id="iconImg" />
            </button>
            <button className="icon" data-label="phone">
              <img src={phoneSvg} alt="phone" id="iconImg" />
            </button>
            <button className="icon" data-label="password">
              <img src={padlockSvg} alt="lock" id="iconImg" />
            </button>
          </div>
          <div className="btn-group">
            <button className="btn" type="button" onClick={()=> getUser()}>
              new user
            </button>
            <button className="btn" type="button" onClick={() => getList()}>
              add user
            </button>
          </div>

          <table className="table">
            <thead>
              <tr className="head-tr">
                <th className="th">Firstname</th>
                <th className="th">Email</th>
                <th className="th">Phone</th>
                <th className="th">Age</th>
              </tr>
            </thead>
            <tbody>
              {listData?.map((item) => {
                return (
                  <tr className="body-tr">
                    <th>
                      {item?.user.name.first} {item?.user.name.last}
                    </th>
                    <th>{item?.user.email}</th>
                    <th>{item?.user.phone}</th>
                    <th>{item?.user.dob?.age}</th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

export default App;
