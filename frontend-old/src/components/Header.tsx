import '../App.css';

const Header: React.FC = () => {
    return (
      <div className="header_main">
        <img src="public/bell.svg" alt="notifbell icon" className="notifbell" />
        <h1 className="header_title">
          <span className="dbs">DBS</span><span className="biz">Biz</span>
        </h1>
        <img src="public/dbslogo.svg" alt="dbslogo" className="dbslogo" />
      </div>
    );
  };
  
  export default Header;