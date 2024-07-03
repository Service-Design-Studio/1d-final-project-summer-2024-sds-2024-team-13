import "./Home.css";
import Header from "./Header";
import TopCard from "./TopCard";
import TopFive from "./TopFive";
import Navigator from "./navigatorbar";

const Home: React.FC = () => {
  return (
    <div className="App">
      <Navigator />
      <Header />
      <TopCard />
      <TopFive />
    </div>
  );
};

export default Home;
