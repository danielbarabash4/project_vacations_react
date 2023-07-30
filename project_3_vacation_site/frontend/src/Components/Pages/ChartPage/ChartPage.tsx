import { useNavigate } from "react-router-dom";
import "./ChartPage.css";
import { useEffect, useState } from "react";
import Like from "../../Modal/Like";
import Vacation from "../../Modal/Vacation";
import { vacation } from "../../redux/store";
import { downloadUserAction } from "../../redux/UserReducer";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { saveAs } from "file-saver";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);
function ChartPage(): JSX.Element {
  const navigate = useNavigate();
  const [allLikes, setAllLikes] = useState<Like[]>([]);
  const [allVacs, setAllVacs] = useState<Vacation[]>([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    //  checking if the user is an admin
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

    //  getting all the likes
    const getData = async () => {
      const theLikes = (
        await axios.get("http://localhost:4000/api/v1/vac/allLikes")
      ).data;
      // getting all the vacations
      const theVacs = (
        await axios.get("http://localhost:4000/api/v1/vac/allVac")
      ).data;

      //setting the likes and vacations to global values
      setAllLikes(theLikes);
      setAllVacs(theVacs);
    };
    getData();
    setRefresh(true);
  }, []);

  // adding the likes for each vacation to the vacation object
  const vacsWithLikes = allVacs.map((vacation) => {
    const likesPerVac = allLikes.filter(
      (follow) => +follow.vac_id === +vacation.id
    ).length;
    return { ...vacation, likesPerVac };
  });

  //chart data
  const data = {
    labels: vacsWithLikes.map((item) => item.destination),
    datasets: [
      {
        label: "likes",
        data: vacsWithLikes.map((item) => item.likesPerVac),
        backgroundColor: "lightgreen",
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };

  const options = {};

  const downloadCsv = () => {
    let csv = "";
    csv += "destination,likes per destination\n";

    vacsWithLikes.map((vac) => {
      return (csv += `${vac.destination.split(",")[0]},${vac.likesPerVac}\n`);
    });

    const csvDownload = new Blob([csv], { type: "text/csv;charset=utf-8" });

    saveAs(csvDownload, "vacations_likes_chart.csv");
    console.log(csv);
    //console.log(csv);
  };

  return (
    <div className="chartPage">
      <div className="chartContainer">
        <Bar data={data} options={options}></Bar>
      </div>
      <div className="btnDiv">
        <button
          className="btn backBtn"
          onClick={() => {
            navigate("/home");
          }}
        >
          {" "}
          Go home
        </button>
        <button
          className="btn downloadBtn"
          onClick={() => {
            downloadCsv();
          }}
        >
          Download chart as csv
        </button>
      </div>
    </div>
  );
}
export default ChartPage;
