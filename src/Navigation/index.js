import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import * as routes from '../constants/routes'
import Input from '../Input'
import Button from '../Button'

import './style.css'

const Navigation = ({ organizationName, onOrganizationSearch }) => {
  const { pathname } = useLocation()

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
            organizationName={organizationName}
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

  const handleSubmit = evt => {
    evt.preventDefault()
    onOrganizationSearch(organization)
  }

  return (
    <div className="organization-form">
      <form onSubmit={handleSubmit}>
        <Input type="text" color="white" value={organization} onChange={handleChange} />{' '}
        <Button color="white" type="submit">Search Repos</Button>
      </form>
    </div>
  )
}

export default Navigation