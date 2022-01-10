import { gql, useQuery } from '@apollo/client'
import Loading from '../Loading'
import RepositoryList, { REPOSITORY_FRAGMENT } from '../Repository'
import ErrorMessage from '../Error'

const GET_REPOSITORIES_OF_CURRENT_USER = gql`
  ${REPOSITORY_FRAGMENT}
  query($cursor: String){
    viewer {
      login
      name
      repositories(first: 5, orderBy: { direction: DESC, field: STARGAZERS }) {
        edges {
          node {
            ...repository
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`

const Profile = () => {
  const { loading, error, data } = useQuery(GET_REPOSITORIES_OF_CURRENT_USER)
  
  if(loading) {
    <Loading />
  }

  if(error) return <ErrorMessage error={error} />

  if(!data)  return null
  const { viewer } = data

  return (
    <RepositoryList repositories={viewer.repositories} />
  )
}

export default Profile