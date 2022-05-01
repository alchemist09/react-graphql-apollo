import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import * as routes from '../constants/routes'

import './style.css'

const Navigation = () => {
  const [orgName, setOrgName] = useState('github')
  const { pathname } = useLocation()

  const onOrganizationSearch = value => {
    setOrgName(value)
  }

  return (
    <header className="Navigation">
      <nav>
        <ul>
          <li className="Navigation-link">
            <Link to={routes.ORGANIZATION}>Home</Link>
          </li>
          <li className="Navigation-link">
            <Link to={routes.PROFILE}>Profile</Link>
          </li>
        </ul>
        {pathname === routes.ORGANIZATION && (
          <OrganizationSearch 
            organizationName={orgName}
            onOrganizationSearch={onOrganizationSearch} 
          />
        )}
      </nav>
    </header>
  )
}

const OrganizationSearch = ({ organizationName, onOrganizationSearch }) => {
  const [organization, setOrganization] = useState(organizationName)

  const handleChange = evt => {
    setOrganization(evt.target.value)
  }

  const handleSubmit = () => {
    onOrganizationSearch(organization)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Organization</label>
      <input type="text" id="org_name" value={organization} onChange={handleChange} />
      <button type="submit">Search Repos</button>
    </form>
  )
}

export default Navigation