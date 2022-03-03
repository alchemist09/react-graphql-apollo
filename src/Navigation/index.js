import { Link } from 'react-router-dom'
import * as routes from '../constants/routes'

import './style.css'

const Navigation = () => {
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
      </nav>
    </header>
  )
}

export default Navigation