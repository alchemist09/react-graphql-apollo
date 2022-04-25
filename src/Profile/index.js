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
      repositories(first: 5, orderBy: { direction: DESC, field: STARGAZERS }, after: $cursor) {
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
  const { loading, error, data, fetchMore } = useQuery(GET_REPOSITORIES_OF_CURRENT_USER, {
    notifyOnNetworkStatusChange: true
  })
  
  if(loading && !data) {
    console.log("data: ", data)
    return <Loading position="top" />
  }

  if(error) return <ErrorMessage error={error} />

  if(!data)  return null
  const { viewer } = data

  return (
    <div className="App-content_small-header">
      <RepositoryList loading={loading} repositories={viewer.repositories} fetchMore={fetchMore} />
    </div>
  )
}

export default Profile