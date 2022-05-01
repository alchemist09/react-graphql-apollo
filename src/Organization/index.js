import { gql, useQuery } from "@apollo/client"
import RepositoryList, { REPOSITORY_FRAGMENT } from "../Repository"
import Loading from "../Loading"
import ErrorMessage from "../Error"

const GET_REPOSITORIES_OF_ORGANIZATION = gql`
  ${REPOSITORY_FRAGMENT}
  query($organizationLogin: String!, $cursor: String) {
    organization(login: $organizationLogin) {
      repositories(first: 5, orderBy: { direction: DESC, field: CREATED_AT }, after: $cursor) {
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


const Organization = ({ organizationLogin }) => {
  const { loading, error, data, fetchMore } = useQuery(GET_REPOSITORIES_OF_ORGANIZATION, {
    variables: {
      organizationLogin
    },
    notifyOnNetworkStatusChange: true
  })

  if(loading && !data) {
    return <Loading position="top" />
  }

  if(error) {
    console.error(error)
    return <ErrorMessage error={error} />
  }

  if(!data) { return null }

  console.log(data)
  const { organization } = data

  return (
    <div className="App-content_large-header">
      <h1>repos for {organizationLogin}</h1>

      <RepositoryList 
        loading={loading}
        repositories={organization.repositories}
        fetchMore={fetchMore}
      />
    </div>
  )
}

export default Organization