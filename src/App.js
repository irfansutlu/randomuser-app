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
  const [targeting, setTargeting] = useState("");

  const getUser = async () => {
    const { data } = await axios(url);
    setUser(data.results[0]);
    console.log(data.results[0]);
  };

  const getList = () => {
    setListdata([...listData, { user }]);
  };

  const photo = () => {
    return user?.gender === "female" ? womanSvg : manSvg;
  };
  const photoAge = () => {
    return user?.gender === "female" ? womanAgeSvg : manAgeSvg;
  };

  const getInfo = (targeting) => {
    if (targeting === "name") {
      return `${user?.name?.first}`;
    } else {
      return "alo";
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  console.log(targeting);

  return (
    <main>
      <div className="block bcg-orange"></div>
      <div className="block">
        <div className="container">
          <img
            src={user?.picture?.large}
            alt="random user"
            className="user-img"
          />
          <p className="user-title">{`My ${targeting}  is`}</p>
          <p className="user-value">{getInfo()}</p>
          <div
            className="values-list"
            onMouseOver={(e) => setTargeting(e.target.value)}
          >
            <button className="icon" value="name">
              <img src={photo()} alt="user" id="iconImg" />
            </button>
            <button className="icon" value="email">
              <img src={mailSvg} alt="mail" id="iconImg" />
            </button>
            <button className="icon" value="age">
              <img src={photoAge()} alt="age" id="iconImg" />
            </button>
            <button className="icon" value="street">
              <img src={mapSvg} alt="map" id="iconImg" />
            </button>
            <button className="icon" value="phone">
              <img src={phoneSvg} alt="phone" id="iconImg" />
            </button>
            <button className="icon" value="password">
              <img src={padlockSvg} alt="lock" id="iconImg" />
            </button>
          </div>
          <div className="btn-group">
            <button className="btn" type="button" onClick={() => getUser()}>
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
