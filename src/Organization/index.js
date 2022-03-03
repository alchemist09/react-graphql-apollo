import { gql, useQuery } from "@apollo/client"
import { REPOSITORY_FRAGMENT } from "../Repository"
import Loading from "../Loading"
import ErrorMessage from "../Error"
import RepositoryItem from "../Repository/RepositoryItem"

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


const Organization = ({ organizationLogin }) => {
  const { loading, error, data } = useQuery(GET_REPOSITORIES_OF_ORGANIZATION, { 
    variables: {
      organizationLogin
    }
  })

  if(loading && !data) {
    return <Loading />
  }

  if(error) {
    return <ErrorMessage error={error} />
  }

  if(!data) { return null }

  console.log(data)
  const { organization } = data

  return (
    <div className="App-content_large-header">
      <h1>Organization</h1>

      {organization.repositories.edges.map(({ node }) => {
        return (
          <div key={node.id} className="RepositoryItem">
            <RepositoryItem {...node} />
          </div>
        )
      })}
    </div>
  )
}

Organization.defaultProps = {
  organizationLogin: "github"
}

export default Organization