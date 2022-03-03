import { gql, useQuery } from "@apollo/client"
import { REPOSITORY_FRAGMENT } from "../Repository"
import Loading from "../Loading"
import ErrorMessage from "../Error"
import RepositoryList from "../Repository"

const GET_REPOSITORIES_OF_ORGANIZATION = gql`
  ${REPOSITORY_FRAGMENT}
  query($organizationLogin: String!) {
    organization(login: $organizationLogin) {
      repositories(first: 5, orderBy: { direction: DESC, field: CREATED_AT }) {
        edges {
          node {
            ...repository
          }
        }
      }
    }
  }
`


const Organization = ({ organizationName }) => {
  const { loading, error, data, fetchMore } = useQuery(GET_REPOSITORIES_OF_ORGANIZATION, { 
    variables: {
      login: organizationName
    }
  })

  if(loading && !data) {
    return <Loading />
  }

  if(error) {
    return <ErrorMessage error={error} />
  }

  if(!data) { return null }

  const { repositories } = data.repositories

  return (
    <div className="App-content_large-header">
      <h1>Organization</h1>
      <RepositoryList loading={loading} repositories={repositories} fetchMore={fetchMore} />
    </div>
  )
}

export default Organization