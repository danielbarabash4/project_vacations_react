import { useState } from "react";
import "./Header.css";
import { vacation } from "../../redux/store";

function Header(): JSX.Element {
  const [title, setTitle] = useState("");
  //const [refresh, setRefresh] = useState(false);

  vacation.subscribe(() => {
    const theUser = vacation.getState().User.Logged;

    if (theUser.length > 0) {
      if (theUser[0].admin === "true") {
        setTitle(`welcome back, admin ${theUser[0].name}`);
      } else if (theUser[0].admin === "false") {
        setTitle(`Welcome back, ${theUser[0].name}`);
      }
    } else if (theUser.length === 0) {
      setTitle("");
    }
  });

  return (
    <div className="Header">
      <h2 className="title">Booking But Better (BBB)</h2>
      <h3 className="title">{title}</h3>
    </div>
  );
}

export default Header;
