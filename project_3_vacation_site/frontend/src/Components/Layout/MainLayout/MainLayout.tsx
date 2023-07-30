import MainRouter from "../../routing/MainRouter/MainRouter";
import Header from "../Header/Header";
import "./MainLayout.css";

function MainLayout(): JSX.Element {
  return (
    <div className="MainLayout">
      <header>
        <Header />
      </header>
      <main>
        <MainRouter />
      </main>
    </div>
  );
}

export default MainLayout;
