import { gql } from '@apollo/client'

const GET_CURRENT_USER = gql`
  {
    viewer {
      login
      name
    }
  }
`

const Profile = () => {
  return (
    <div>Profile</div>
  )
}

export default Profile