import { useNavigate } from "react-router-dom";
import "./Main.css";
import { vacation } from "../../redux/store";
import { deleteUserAction, downloadUserAction } from "../../redux/UserReducer";
import { useEffect, useState } from "react";
import axios from "axios";
import { downloadVacAction } from "../../redux/VacReducer";
import SingleItem from "../vacations/SingleItem/SingleItem";

function Main(): JSX.Element {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [refresh, setRefresh] = useState(false);
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);

  const postsPerPage = 10;

  const logOut = () => {
    localStorage.removeItem("user");
    vacation.dispatch(deleteUserAction());
    navigate("/login");
  };

  useEffect(() => {
    if (vacation.getState().Vacs.allVacs.length < 1) {
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
          localStorage.setItem("vacs", JSON.stringify(newRes));
          if (localStorage.getItem("user") === null) {
            navigate("/");
          }
          setRefresh(!refresh);
        });
    }
    if (localStorage.getItem("user") != null) {
      vacation.dispatch(
        downloadUserAction(JSON.parse(localStorage.getItem("user") as any))
      );
      vacation.subscribe(() => {
        setRefresh(!refresh);
      });
    }
    //end of useEffect
  });

  const userButtons = () => {
    const theUser = vacation.getState().User.Logged;
    if (theUser.length > 0) {
      if (theUser[0].admin === "true") {
        return (
          <div className="adminBtn">
            <button className="btn addBtn" onClick={() => navigate("/addVac")}>
              Add a vacation
            </button>
            <button className="btn" onClick={() => navigate("/chart")}>
              like chart
            </button>
          </div>
        );
      } else if (theUser[0].admin === "false") {
        return (
          <div className="allHeader">
            <div className="checkBoxes">
              <label className="toggler-wrapper style-6">
                <input
                  checked={check1}
                  type="checkbox"
                  onChange={() => {
                    setCheck1(!check1);
                    checkBoxesFunc1();
                  }}
                />
                <div className="toggler-slider">
                  <div className="toggler-knob"></div>
                </div>
              </label>

              <label className="toggler-wrapper style-6">
                <input
                  checked={check2}
                  type="checkbox"
                  onChange={() => {
                    setCheck2(!check2);
                    checkBoxesFunc2();
                  }}
                />
                <div className="toggler-slider">
                  <div className="toggler-knob"></div>
                </div>
              </label>

              <label className="toggler-wrapper style-6">
                <input
                  type="checkbox"
                  checked={check3}
                  onChange={() => {
                    setCheck3(!check3);
                    checkBoxesFunc3();
                  }}
                />
                <div className="toggler-slider toggler-sliderLiked">
                  <div className="toggler-knob"></div>
                </div>
              </label>
            </div>

            <div className="checkBoxes">
              <p className="pBtn">yet to start vacations</p>
              <p className="pBtn">active vacations</p>
              <p className="pBtn">my liked vacations</p>
            </div>
          </div>
        );
      }
    } else {
      vacation.subscribe(() => {
        setRefresh(!refresh);
      });
    }
  };

  const checkBoxesFunc1 = () => {
    const fullVacs = JSON.parse(localStorage.getItem("vacs") as any);
    vacation.dispatch(downloadVacAction(fullVacs));
    const active = !check1;
    setCheck2(false);
    setCheck3(false);
    if (active) {
      const tempVac: any = [];
      const vacs = vacation.getState().Vacs.allVacs;
      const toDay = new Date().getTime();
      vacs.map((item: any) => {
        const beginDate = item.begin.split("/");

        const trueBegin = new Date(
          parseInt(beginDate[2]),
          parseInt(beginDate[1]) - 1,
          parseInt(beginDate[0])
        );
        if (trueBegin.getTime() - toDay > 0) {
          tempVac.push(item);
        }
        return tempVac;
      });
      if (tempVac.length !== vacs.length) {
        vacation.dispatch(downloadVacAction(tempVac));
      }
    } else {
      const fullVacs = JSON.parse(localStorage.getItem("vacs") as any);
      vacation.dispatch(downloadVacAction(fullVacs));
    }
  };

  const checkBoxesFunc2 = () => {
    const fullVacs = JSON.parse(localStorage.getItem("vacs") as any);
    vacation.dispatch(downloadVacAction(fullVacs));
    setCheck1(false);
    const active = !check2;
    setCheck3(false);
    if (active) {
      const tempVac: any = [];
      const vacs = vacation.getState().Vacs.allVacs;
      const toDay = new Date().getTime();
      vacs.map((item: any) => {
        const beginDate = item.begin.split("/");
        const finishDate = item.finish.split("/");

        const trueBegin = new Date(
          parseInt(beginDate[2]),
          parseInt(beginDate[1]) - 1,
          parseInt(beginDate[0])
        );

        const trueFinish = new Date(
          parseInt(finishDate[2]),
          parseInt(finishDate[1]) - 1,
          parseInt(finishDate[0])
        );
        if (
          trueBegin.getTime() - toDay < 0 &&
          trueFinish.getTime() - toDay > 0
        ) {
          tempVac.push(item);
        }
        return tempVac;
      });
      if (tempVac.length !== vacs.length) {
        vacation.dispatch(downloadVacAction(tempVac));
      }
    } else {
      const fullVacs = JSON.parse(localStorage.getItem("vacs") as any);
      vacation.dispatch(downloadVacAction(fullVacs));
    }
  };

  const checkBoxesFunc3 = () => {
    const fullVacs = JSON.parse(localStorage.getItem("vacs") as any);
    vacation.dispatch(downloadVacAction(fullVacs));
    setCheck1(false);
    setCheck2(false);
    const active = !check3;
    if (active) {
      const tempVac: any = [];
      const vacs = vacation.getState().Vacs.allVacs;
      const user = vacation.getState().User.Logged[0].id;
      ///console.log(user);
      //console.log(vacs)
      axios
        .get(`http://localhost:4000/api/v1/vac/likesByUser/${user}`)
        .then((response) => response.data)
        .then((result) => {
          vacs.map((vac: any) => {
            result.map((item: any) => {
              if (+vac.id === +item.vac_id) {
                tempVac.push(vac);
              }
              return tempVac;
            });
            return tempVac;
          });
          if (tempVac.length !== vacs.length) {
            vacation.dispatch(downloadVacAction(tempVac));
          }
        });
    } else {
      const fullVacs = JSON.parse(localStorage.getItem("vacs") as any);
      vacation.dispatch(downloadVacAction(fullVacs));
    }
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = vacation.getState().Vacs.allVacs.slice(indexOfFirstPost, indexOfLastPost);

  const paginationBtn = (postsPerPage: any, totalPosts: any, paginate: any) => {
    const pageNumbers: any = [];

    for (
      let pageNum = 1;
      pageNum <= Math.ceil(totalPosts.length / postsPerPage);
      pageNum++
    ) {
      pageNumbers.push(pageNum);
    }
    return (
      <nav className="btnFix">
        <ul className="pagination">
          {pageNumbers.map((item: any) => (
            <li key={item} className="pageBtn">
              <button onClick={() => paginate(item)} className="singlePageBtn">
                {item}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
  };

  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);

  return (
    <div className="Main">
      <div className="box">
        <button className="outBtn" onClick={logOut}>
          Log Out
        </button>
        {userButtons()}
      </div>
      <div className="vacContainer">
        {currentPosts.map((item) => (
          <SingleItem
            key={item.id}
            id={item.id}
            destination={item.destination}
            description={item.description}
            begin={item.begin}
            finish={item.finish}
            price={item.price}
            img={item.img}
          />
        ))}
      </div>
      <div className="btnFix">
        {paginationBtn(
          postsPerPage,
          vacation.getState().Vacs.allVacs,
          paginate
        )}
      </div>
    </div>
  );
}

export default Main;
