import { useState } from "react";
import type { User } from "../types/User";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";
import { Button, Container } from "react-bootstrap";

const Login = () => {
  const [user, setUser] = useState<User>({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const submit = () => {
    apiClient
      .post("/login", user)
      .then(() => {
        localStorage.setItem("credentials", JSON.stringify(user));
        toast.success("Successfully logged in!");
        navigate("/");
      })
      .catch(() => toast.error("Couldn't log in!"));
  };
  return (
    <>
      <Container>
        <h3>Username: </h3>
        <input
          type="text"
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <h3>Password: </h3>
        <input
          type="password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        /> <br/>
        <Button onClick={submit}>Login</Button>
      </Container>
    </>
  );
};

export default Login;
