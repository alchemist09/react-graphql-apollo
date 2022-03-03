import { gql } from "@apollo/client"
import { REPOSITORY_FRAGMENT } from "../Repository"

const GET_REPOSITORIES_OF_ORGANIZATION = gql`
  ${REPOSITORY_FRAGMENT}
  query($organizationLogin: String!) {
    organization(login: $organizatinLogin) {
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


const Organization = () => (
  <div className="App-content_large-header">
    <h1>Organization</h1>
  </div>
)

export default Organization