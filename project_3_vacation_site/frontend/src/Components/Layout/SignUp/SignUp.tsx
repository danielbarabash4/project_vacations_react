import { NavLink, useNavigate } from "react-router-dom";
import "./SignUp.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { SignUpModal } from "../../Modal/SignUpModal";
import axios from "axios";
import { vacation } from "../../redux/store";
import { downloadUserAction } from "../../redux/UserReducer";
//import loginModal from "../../Modal/loginModal";

function SignUp(): JSX.Element {
  const [email, setEmail] = useState("");
  const [userExist, setExist] = useState("");
  const [passCheck, setPass] = useState("");
  const [shortPass, setShortPass] = useState("");

  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<SignUpModal>();

  const setCurrentUser = async (theUser: any) => {
    theUser = (
      await axios.get(`http://localhost:4000/api/v1/users/getUser/${email}`)
    ).data;
    localStorage.setItem("user", JSON.stringify(theUser));
    vacation.dispatch(downloadUserAction(theUser));
  };

  // const onFormSubmit = (data: any) => {
  //   data.password = passCheck;
  //   console.log(data.password);
  // };

  const newLogin = async () => {
    const userLogin = {
      email: email,
      password: passCheck,
    };

    axios
      .post("http://localhost:4000/api/v1/users/checkLogin", userLogin)
      .then((response) => {
        if (response.data[0].total === 1) {
          console.log("you can login");
          axios
            .get(`http://localhost:4000/api/v1/users/getUser/${email}`)
            .then((response) => {
              const testUser = response.data;
              setCurrentUser(testUser);
              navigate("/home");
            });
        }
      })
      .catch((err) => console.log("your error:", err));
  };

  const signUp = async (signUp: SignUpModal) => {
    signUp.password = passCheck;

    const emailChecker = await axios.get(
      "http://localhost:4000/api/v1/users/allEmails"
    );

    let repeatEmail = false;

    emailChecker.data.map((item: any) => {
      if (item.email === email) {
        setExist("this User already exist");
        repeatEmail = true;
      }
      return true;
    });

    if (repeatEmail === false) {
      setExist("");
      if (passCheck.length < 4) {
        setShortPass(`Password is too short must be at least 4 characters`);
        return;
      } else {
        axios
          .post("http://localhost:4000/api/v1/users/addUser", signUp)
          .then((response) => {
            newLogin();
          })
          .catch((err) => console.log("your error:", err));
      }
    }
  };

  return (
    <div className="SignUp">
      <div className="loginBox">
        <div className="smallHeader">Register</div>
        <div className="notUser">{userExist}</div>
        <div className="notUser">{shortPass}</div>
        <form onSubmit={handleSubmit(signUp)}>
          <div>
            <input
              type="text"
              placeholder="first name"
              {...register("name")}
              required
            />
          </div>
          <input
            type="text"
            placeholder="last name"
            {...register("lastName")}
            required
          />
          <input
            type="email"
            placeholder="email address"
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
            onChange={(args) => {
              setPass(args.currentTarget.value);
            }}
            required
          />
          <input type="submit" className="btn" value={"Sign up and Login"} />
          <p>Already have a User ?</p>
          <div className="link">
            <NavLink to={"/login"}>Login</NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
