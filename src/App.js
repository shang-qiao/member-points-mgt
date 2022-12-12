import logo from './logo.svg';
import './App.css';
// import 'antd/dist/reset.css';
import Header from './components/header';
import { Button } from 'antd';

const App = () => {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <Header />
        <Button type='primary'>BUtton</Button>
      </header>
    </div>
  );
};

export default App;
