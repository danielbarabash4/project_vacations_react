import { useEffect, useState } from "react";
import "./addVac.css";
import { vacation } from "../../redux/store";
import { downloadUserAction } from "../../redux/UserReducer";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Vacation from "../../Modal/Vacation";
import axios from "axios";
import { addVacAction, downloadVacAction } from "../../redux/VacReducer";

function AddVac(): JSX.Element {
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);
  const { register, handleSubmit } = useForm<Vacation>();
  const [img, setImg] = useState("");
  const [imgName, setImgName] = useState("");
  const [newFile, setFile] = useState({});
  
  const [theAlertA, setAlertA] = useState("");
  const [theAlertB, setAlertB] = useState("");

  console.log()

  useEffect(() => {
    if (localStorage.getItem("user") != null) {
      vacation.dispatch(
        downloadUserAction(JSON.parse(localStorage.getItem("user") as any))
      );
      vacation.subscribe(() => {
        setRefresh(!refresh);
      });
    }

    if (
      localStorage.getItem("user") === null ||
      JSON.parse(localStorage.getItem("user") as any)[0].admin === "false"
    ) {
      navigate("/home");
    }
  });

  const addNewVac = (addVac: Vacation) => {
    const dateBegin = addVac.begin.split("-");
    const dateFinish = addVac.finish.split("-");
    const toDay = new Date();

    const trueBegin = new Date(
      parseInt(dateBegin[0]),
      parseInt(dateBegin[1]) - 1,
      parseInt(dateBegin[2])
    );

    const trueFinish = new Date(
      parseInt(dateFinish[0]),
      parseInt(dateFinish[1]) - 1,
      parseInt(dateFinish[2])
    );

    //console.log(trueBegin.toLocaleDateString());

    addVac.begin = trueBegin.toLocaleDateString();
    addVac.finish = trueFinish.toLocaleDateString();
    addVac.img =imgName+".jpg"

    const postVac = async () => {
      await axios.post(
        "http://localhost:4000/api/v1/vac/addVac",
        addVac
      );
      axios.post("http://localhost:4000/api/v1/vac/uploadPhoto",newFile)
      axios
        .get("http://localhost:4000/api/v1/vac/allVac")
        .then((response) => response.data)
        .then((result) => {
          const newRes = result.sort(function (vacA: any, vacB: any) {
            const dateA = vacA.begin.split("/");
            const dateB = vacB.begin.split("/");

            const trueDateA = new Date(
              parseInt(dateA[2]),
              parseInt(dateA[1]) - 1,
              parseInt(dateA[0])
            );

            const trueDateB = new Date(
              parseInt(dateB[2]),
              parseInt(dateB[1]) - 1,
              parseInt(dateB[0])
            );
            return trueDateA.getTime() - trueDateB.getTime();
          });
          vacation.dispatch(downloadVacAction(newRes));
          setRefresh(!refresh);
        });

      vacation.dispatch(addVacAction(addVac));
      setRefresh(!refresh);
      navigate("/");
    };


    if (trueBegin.getTime() - toDay.getTime() < 0) {
      setAlertA("The Start of the vacation");
      setAlertB("needs to be in the future ONLY");
    } else if (trueBegin.getTime() - trueFinish.getTime() >= 0) {
      setAlertA("The End of the vacation");
      setAlertB("needs to be AFTER the Start");
    } else if (addVac.price <= 0 || addVac.price > 10000) {
      setAlertA("the Price need to be");
      setAlertB("higher than 0 or lower than 10000");
    } else {
      postVac();
    }
  };

  const cancelVac = () => {
    navigate("/home");
  };

  const onImageChange = (event:any) => {
    console.log(event.target.files[0].name)
    if (event.target.files && event.target.files[0]) {
      setImg(URL.createObjectURL(event.target.files[0]));
      console.log(event.target.files[0].name)
      const  formData:FormData = new FormData();
      formData.append("file",event.target.files[0])
      setImgName(event.target.files[0].name)
      console.log(formData)
      setFile(formData)
      console.log(newFile)
    }
   }


  return (
    <div className="addVac">
      <div className="addVacBox">
        <h2>add new vacation</h2>
        <div className="notUser">{theAlertA}</div>
        <div className="notUser">{theAlertB}</div>
        <form onSubmit={handleSubmit(addNewVac)}>
          <input
            required
            className="vacInput"
            type="text"
            placeholder="enter destination"
            {...register("destination")}
          />
          <textarea
            required
            placeholder="enter description(under 255 characters)"
            {...register("description")}
          />
          <div>start of the vacation</div>
          <input
            required
            className="vacInput"
            type="date"
            {...register("begin")}
          />
          <div> end of the vacation</div>
          <input
            required
            className="vacInput"
            type="date"
            {...register("finish")}
          />
          <input
            required
            className="vacInput"
            type="number"
            placeholder="vacation's price "
            {...register("price")}
          />
          <label className="fileBtn">
            <input
              required
              className="vacInput"
              type="file"
              {...register("img")}
              onChange={onImageChange}
            />
          </label>
          <button type="submit" className="addVacBtn">
            add vacation
          </button>
          <button className="cnlBtn" onClick={cancelVac}>
            cancel
          </button>
        </form>
      </div>
      <div className="imgBox">
        <h2>the Image</h2>
        {img && <img className="vacImg" src={img} alt=""></img>}
      </div>
    </div>
  );
}

export default AddVac;
