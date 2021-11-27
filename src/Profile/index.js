import { gql, useQuery } from '@apollo/client'
import Loading from '../Loading'

const GET_CURRENT_USER = gql`
  {
    viewer {
      login
      name
    }
  }
`

const Profile = () => {
  const { loading, error, data } = useQuery(GET_CURRENT_USER)
  
  if(loading) {
    <Loading />
  }

  if(error) return `Error: ${error.message}`

  const { viewer } = data

  return (
    <div>
      <h1>Profile</h1>
      {viewer.name} {viewer.login}
    </div>
  )
}

export default Profile