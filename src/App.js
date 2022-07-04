import Card from './components/Card.jsx';
import Counter from './components/Counter.jsx';
import TempConverter from './components/TempConverter.jsx';
import FlightBooker from './components/FlightBooker.jsx';
import Timer from './components/Timer.jsx';
import CRUD from './components/CRUD.jsx';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Card title="Counter">
        <Counter />
      </Card>
      <Card title="Temperature Converter">
        <TempConverter />
      </Card>
      <Card title="Flight Booker">
        <FlightBooker />
      </Card>
      <Card title="Timer">
        <Timer />
      </Card>
      <Card title="CRUD">
        <CRUD />
      </Card>
    </div>
  );
}

export default App;
