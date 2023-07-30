import { NavLink, useNavigate } from "react-router-dom";
import "./LoginLayout.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { loginModal } from "../../Modal/loginModal";
import { vacation } from "../../redux/store";
import { downloadUserAction } from "../../redux/UserReducer";

function LoginLayout(): JSX.Element {
  const [email, setEmail] = useState("");
  const [failedUser, setFailedUser] = useState("");
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<loginModal>();

  useEffect(() => {
    let theUser = JSON.parse(localStorage.getItem("user") as any);
    if (theUser) {
      navigate("/home");
    }
  }, []);

  const login = (userLogin: loginModal) => {
    axios
      .post("http://localhost:4000/api/v1/users/checkLogin", userLogin)
      .then((response) => {
        if (response.data[0].total === 1) {
          axios
            .get(`http://localhost:4000/api/v1/users/getUser/${email}`)
            .then((response) => {
              const theUser = response.data;
              localStorage.setItem("user", JSON.stringify(theUser));
              vacation.dispatch(downloadUserAction(theUser));
            });
          navigate("/home");
        } else {
          setFailedUser("incorrect user or password");
        }
      })
      .catch((err) => console.log("your error:", err));
  };

  return (
    <div className="LoginLayout">
      <div className="loginBox">
        <div className="smallHeader">
          <div className="sophia">Sign in</div>
        </div>
        <div className="notUser" style={{ color: "red" }}>
          {failedUser}
        </div>
        <form onSubmit={handleSubmit(login)}>
          <input
            type="email"
            placeholder="email"
            {...register("email")}
            onChange={(args) => {
              setEmail(args.currentTarget.value);
            }}
            required
          />
          <input
            type="password"
            placeholder="password"
            {...register("password")}
            required
          />
          <button className="btn">Login</button>
        </form>
        <p> Don't have a user ?</p>
        <div className="link">
          <NavLink to={"/signUp"}>Sign up</NavLink>
        </div>
      </div>
    </div>
  );
}

export default LoginLayout;
