import './App.css';
import Profile from './Profile';
import Organization from './Organization';
import { Routes, Route } from 'react-router-dom'
import * as routes from './constants/routes'

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route exact path={routes.ORGANIZATION} element={<Organization />} />
        <Route path={routes.PROFILE} element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
