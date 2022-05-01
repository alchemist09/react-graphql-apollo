import { Link, useLocation } from 'react-router-dom'
import * as routes from '../constants/routes'

import './style.css'

const Navigation = () => {
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
        {pathname === routes.ORGANIZATION && (<OrganizationSearch />)}
      </nav>
    </header>
  )
}

const OrganizationSearch = () => <div>Search Organization</div>

export default Navigation