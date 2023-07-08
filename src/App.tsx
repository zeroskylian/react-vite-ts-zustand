import './App.css';
import Demo from './demo/Demo';
import useStore from './store/store';

function App() {
  const store = useStore();
  return (
    <div className="card">
      <p>{store.name}</p>
      <button onClick={() => store.increaseCount(2)}>
        count is {store.count}
      </button>
      <Demo />
    </div>
  );
}

export default App;
