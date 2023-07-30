import { Route, Routes } from "react-router-dom";
import "./MainRouter.css";
import Page404 from "../../Pages/Page404/Page404";
import LoginLayout from "../../Layout/LoginLayout/LoginLayout";
import SignUp from "../../Layout/SignUp/SignUp";
import Main from "../../Layout/Main/Main";
import AddVac from "../../Pages/addVac/addVac";
import EditVac from "../../Pages/editVac/editVac";
import ChartPage from "../../Pages/ChartPage/ChartPage";

function MainRouter(): JSX.Element {
  return (
    <div className="MainRouter">
      <Routes>
        <Route path="/" element={<LoginLayout />} />
        <Route path="/login" element={<LoginLayout />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/home" element={<Main />} />
        <Route path="/addVac" element={<AddVac />} />
        <Route path="/editVac/:vacId" element={<EditVac />} />
        <Route path="/chart" element={<ChartPage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default MainRouter;
