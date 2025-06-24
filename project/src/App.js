import './App.css';
import Link from './components/link';
import Welcome from './components/welcome';
import Counter from './components/counter';
import List from './components/list';
import Mega from './components/mega';

function App() {

  return (
    <div className="App">
      <Welcome text="Gil Eduardo" />
      <Link url="https://www.google.com" text="Google"/>
      <Counter val="10"/>
      <List />
      <Mega />
    </div>
  );
}

export default App;