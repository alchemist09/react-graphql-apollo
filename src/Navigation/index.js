import { Link } from 'react-router-dom'
import * as routes from '../constants/routes'

import './style.css'

const Navigation = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to={routes.ORGANIZATION}>Home</Link>
          </li>
          <li>
            <Link to={routes.PROFILE}>Profile</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navigation