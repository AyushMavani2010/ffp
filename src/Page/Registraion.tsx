import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import styled from "@emotion/styled";
import PassworD from "../components/icon/Password";
import UserName from "../components/icon/UserName";
import Email from "../components/icon/Email";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RootContainer = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flex: 1,
  height: "100vh",
  backgroundSize: "cover",
  backgroundPosition: "center",
});

const RootChild = styled.div({
  padding: "20px",
  backgroundColor: "white",
  borderRadius: "10px",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
});

const ChildDiv = styled.div({
  display: "flex",
  justifyContent: "center",
  margin: "20px",
});

const Heading = styled.p({
  display: "flex",
  justifyContent: "center",
  fontSize: "30px",
  fontWeight: 700,
  alignItems: "center",
  color: "black",
});

const InputContainer = styled.div({
  borderRadius: "20px",
  height: "50px",
  fontSize: "16px",
  fontWeight: 400,
  display: "flex",
  backgroundColor: "rgba(240, 237, 255, 0.8)",
  gap: 10,
  alignItems: "center",
  justifyContent: "space-between",
});

const Registraion = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const navigate = useNavigate();

  const handleRegistration = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const userData = { username: userName, email, password, gender };

    axios
      .post("http://localhost:5000/register", userData)
      .then((response) => {
        if (response && response.data) {
          console.log(response.data.message);
          navigate("/login");
        } else {
          console.log("No response data");
        }
      })
      .catch((error) => {
        if (error.response) {
          console.error(error.response.data.message);
        } else {
          console.error("Error occurred:", error.message);
        }
      });
  };

  return (
    <RootContainer>
      <RootChild>
        <Heading>Registration</Heading>
        {/* Username */}
        <ChildDiv>
          <InputContainer>
            <div style={{ display: "flex", marginLeft: "20px" }}>
              <UserName size={20} />
            </div>
            <div>
              <Input
                placeholder="Username "
                height={35}
                value={userName}
                width={400}
                color="black"
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
          </InputContainer>
        </ChildDiv>
        {/* Email */}
        <ChildDiv>
          <InputContainer>
            <div style={{ display: "flex", marginLeft: "20px" }}>
              <Email size={20} />
            </div>
            <div>
              <Input
                placeholder="Email "
                height={35}
                value={email}
                width={400}
                color="black"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </InputContainer>
        </ChildDiv>
        {/* Password */}
        <ChildDiv>
          <InputContainer>
            <div style={{ display: "flex", marginLeft: "20px" }}>
              <PassworD size={20} />
            </div>
            <div>
              <Input
                placeholder="Password"
                height={35}
                value={password}
                width={400}
                color="black"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </InputContainer>
        </ChildDiv>
        {/* Confirm Password */}
        <ChildDiv>
          <InputContainer>
            <div style={{ display: "flex", marginLeft: "20px" }}>
              <PassworD size={20} />
            </div>
            <div>
              <Input
                placeholder="Confirm Password"
                height={35}
                value={confirmPassword}
                width={400}
                color="black"
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </InputContainer>
        </ChildDiv>
        {/* Gender */}
        <ChildDiv>
          <InputContainer>
            <div style={{ display: "flex", marginLeft: "20px" }}>
              <span>Gender:</span>
            </div>
            <div>
              <select
                style={{
                  height: "35px",
                  width: "400px",
                  borderRadius: "20px",
                  paddingLeft: "10px",
                  border: "none",
                  backgroundColor: "rgba(240, 237, 255, 0.8)",
                  color: "black",
                }}
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </InputContainer>
        </ChildDiv>
        {/* Buttons */}
        <ChildDiv>
          <div>
            <Button
              type="submit"
              width="124px"
              height="52px"
              BgColor="rgba(145, 129, 244, 1)"
              borderRadius="20px"
              name=" Registration Now"
              color="white"
              border="none"
              onClick={handleRegistration}
            />
          </div>
          <div style={{ paddingLeft: "15px" }}>
            <Button
              width="124px"
              height="52px"
              BgColor="rgba(145, 129, 244, 1)"
              borderRadius="20px"
              name="Login Now"
              color="white"
              border="none"
              onClick={() => {
                navigate("/login");
              }}
            />
          </div>
        </ChildDiv>
      </RootChild>
    </RootContainer>
  );
};

export default Registraion;
