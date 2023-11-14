import React, { useState } from "react";
function Custom() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [userErr, setUserErr] = useState(false);
  const [passErr, setPassErr] = useState(false);

  function loginHandle(e) {
    let flag = false;

    if (user.length < 5) {
      setUserErr(true);
      flag = true;
    }
    if (password.length < 5) {
      setPassErr(true);
      flag = true;
    }
    if (flag == false) {
      setUserErr(false);
      setPassErr(false);
      console.log("fskjf", user);
      console.log("fskjf", password);
    }

    e.preventDefault();
  }
  function userHandler(e) {
    let item = e.target.value;

    if (item.length < 3) {
      setUserErr(true);
    } else {
      setUserErr(false);
    }
    setUser(item);
  }
  function passwordHandler(e) {
    let item = e.target.value;
    if (item.length < 3) {
      setPassErr(true);
    } else {
      setPassErr(false);
    }
    setPassword(item);
  }
  return (
    <>
      <h1>Login</h1>
      <form onSubmit={loginHandle}>
        <input type="text" placeholder="Enter User Id" onChange={userHandler} />
        {userErr ? <div>User Not Valid</div> : ""}
        <br /> <br />
        <input
          type="password"
          placeholder="Enter User Password"
          onChange={passwordHandler}
        />
        {passErr ? <div>Password Not Valid</div> : ""}
        <br /> <br />
        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default Custom;
