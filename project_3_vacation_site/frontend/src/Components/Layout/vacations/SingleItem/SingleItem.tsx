import { useEffect, useState } from "react";
import "./SingleItem.css";
import { vacation } from "../../../redux/store";
import { downloadUserAction } from "../../../redux/UserReducer";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-overlays";
import axios from "axios";
import { downloadVacAction } from "../../../redux/VacReducer";

interface itemProps {
  id: number;
  destination: string;
  description: string;
  begin: string;
  finish: string;
  price: number;
  img: string;
}

function SingleItem(props: itemProps): JSX.Element {
  const [refresh, setRefresh] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [myStyle, setStyle] = useState("likeBtn");
  const [likesPerVac, setLikes] = useState(0);
  const navigate = useNavigate();
  const renderBackdrop = (props: any) => (
    <div className="backdrop" {...props} />
  );

  useEffect(() => {
    if (localStorage.getItem("user") != null) {
      vacation.dispatch(
        downloadUserAction(JSON.parse(localStorage.getItem("user") as any))
      );
    }
  });

  var handleClose = () => setShowModal(false);
  const [like, setLike] = useState(false);

  var handleSave = (id: any) => {
    setShowModal(true);
  };

  const deleteTheVac = async (id: number) => {
    await axios.delete(`http://localhost:4000/api/v1/vac/deleteVac/${id}`);

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
        if (localStorage.getItem("user") === null) {
          navigate("/");
        }
        setRefresh(!refresh);
      });

    setShowModal(false);
  };

  const likeClick = async () => {
    //getting all the likes and the logged user id
    const allLikes = (
      await axios.get("http://localhost:4000/api/v1/vac/allLikes")
    ).data;
    const userId = JSON.parse(localStorage.getItem("user") as any)[0];

    //declaring the like
    const theLike: any = {
      userId: +userId.id,
      vacId: +props.id,
      vacName: props.destination,
    };

    //checking if the vacation is liked
    let liked: any = 0;
    allLikes.map((like: any) => {
      if (+like.user_id === +userId.id && +like.vac_id === +props.id) {
        setStyle("likeBtn");
        return (liked = like);
      } else {
        setStyle("disLikeBtn");
        return liked;
      }
    });

    //like/dislike

    liked.like_id
      ? await axios.delete(
          `http://localhost:4000/api/v1/vac/disLike/${liked.like_id}`
        )
      : await axios.post(`http://localhost:4000/api/v1/vac/like`, theLike);

    //getting likes refreshing the likes number
    const likeNum = (
      await axios.get(`http://localhost:4000/api/v1/vac/likesByVac/${props.id}`)
    ).data;

    if (likeNum.length !== likesPerVac) {
      setLikes(likeNum.length);
      setRefresh(!refresh);
    }
  };

  const onlyAdminButton = () => {
    const getUser = vacation.getState().User.Logged;

    const userId = getUser[0];

    let liked: any = 0;
    let btnColor: any = 0;

    if (userId) {
      axios
        .get(`http://localhost:4000/api/v1/vac/likesByVac/${props.id}`)
        .then((response) => response.data)
        .then((result) => {
          result.map((like: any) => {
            if (+like.user_id === +userId.id) {
              return btnColor++;
            } else {
              return btnColor;
            }
          });
          if (btnColor > 0) {
            setStyle("disLikeBtn");
          } else {
            setStyle("likeBtn");
          }
        });

      axios
        .get(`http://localhost:4000/api/v1/vac/likesByVac/${props.id}`)
        .then((response) => response.data)
        .then((result) => {
          result.map((like: any) => {
            if (+like.vac_id === +props.id) {
              return (liked = like);
            } else {
              return liked;
            }
          });

          if (liked) {
            if (liked) {
              if (result.length !== likesPerVac) {
                setLikes(result.length);
              }
            }
          }
        });

      const theUser = vacation.getState().User.Logged;
      if (theUser.length > 0) {
        if (theUser[0].admin === "true") {
          return (
            <div className="editBtn">
              <button
                onClick={() => {
                  navigate(`/editVac/${props.id}`);
                }}
              >
                edit
              </button>
              <button
                className="deleteBtn"
                onClick={() => handleSave(props.id)}
              >
                delete
              </button>
            </div>
          );
        } else if (theUser[0].admin === "false") {
          return (
            <div>
              <button
                className={myStyle}
                onClick={() => {
                  setLike(!like);
                  likeClick();
                }}
              >
                Like {likesPerVac}
              </button>
            </div>
          );
        }
      } else {
        vacation.subscribe(() => {
          setRefresh(!refresh);
        });
      }
    }
  };

  onlyAdminButton();

  return (
    <div className="SingleItem">
      <div className="vacBox">
        <img
          src={require(`../../../../../../backend/Photos//${props.img}`)}
          alt=""
        />
        {onlyAdminButton()}
        <div className="dates">
          <p>{props.destination}</p>
          <p>
            {props.begin}-{props.finish}
          </p>
        </div>
        <div className="desc">
          <p>{props.description}</p>
          <div className="price">{props.price} $</div>
        </div>
      </div>
      <Modal
        className="modal"
        show={showModal}
        onHide={handleClose}
        renderBackdrop={renderBackdrop}
      >
        <div className="modal">
          <div>
            <h1>Are you Sure you want to delete this vacation ?</h1>
            <h2>this action is permanent</h2>
            <h2>(for a very long time)</h2>
            <h3 className="dates">{props.destination}</h3>
          </div>
          <hr />
          <button
            className="modalBtnYes"
            onClick={() => deleteTheVac(props.id)}
          >
            Yes
          </button>
          <button
            className="modalBtnNo"
            onClick={() => {
              setShowModal(false);
            }}
          >
            No
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default SingleItem;
