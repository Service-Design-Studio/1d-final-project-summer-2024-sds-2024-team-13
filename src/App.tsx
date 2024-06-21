import './App.css';
import Header from './components/Header';
import TopCard from './components/TopCard';
import TopFive from './components/TopFive';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <TopCard />
      <TopFive />
    </div>
  );
}

export default App;
