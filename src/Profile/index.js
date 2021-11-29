import { gql, useQuery } from '@apollo/client'
import Loading from '../Loading'
import RepositoryList from '../Repository'

const GET_REPOSITORIES_OF_CURRENT_USER = gql`
  {
    viewer {
      login
      name
      repositories(first: 5, orderBy: { direction: DESC, field: stargazers }) {
        edges {
          node {
            id
            name
            url
            descriptionHTML
            primaryLanguage {
              name
            }
            owner {
              login
              url
            }
            stargazers {
              totalCount
            }
            viewerHasStared
            watchers {
              totalCount
            }
            viewerSubscription
          }
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

  if(error) return `Error: ${error.message}`

  if(!data)  return null
  const { viewer } = data

  return (
    <RepositoryList repositories={viewer.repositories} />
  )
}

export default Profile