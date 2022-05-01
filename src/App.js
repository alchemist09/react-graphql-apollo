import { useState } from 'react';
import './App.css';
import Profile from './Profile';
import Organization from './Organization';
import Navigation from './Navigation';
import { Routes, Route } from 'react-router-dom'
import * as routes from './constants/routes'

function App() {
  const [orgName, setOrgName] = useState('github')

  const onOrganizationSearch = (value) => {
    setOrgName(value)
  }

  return (
    <div className='App'>
      <Navigation
        organizationName={orgName}
        onOrganizationSearch={onOrganizationSearch}
      />

      <Routes>
        <Route exact path={routes.ORGANIZATION} element={<Organization organizationLogin={orgName} />} />
        <Route path={routes.PROFILE} element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
