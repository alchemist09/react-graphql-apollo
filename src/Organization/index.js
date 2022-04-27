import { useState } from "react"
import { gql, useQuery } from "@apollo/client"
import { REPOSITORY_FRAGMENT } from "../Repository"
import Loading from "../Loading"
import ErrorMessage from "../Error"
import RepositoryItem from "../Repository/RepositoryItem"

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
  const [newOrganization, setNewOrganization] = useState('')
  const { loading, error, data, refetch } = useQuery(GET_REPOSITORIES_OF_ORGANIZATION, { 
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

  const lookupOrgRepos = (evt) => {
    evt.preventDefault()
    if(!newOrganization) {
      return
    }
    refetch({
      organizationLogin: newOrganization
    })
  }

  const handleChange = evt => {
    setNewOrganization(evt.target.value)
  }

  return (
    <div className="App-content_large-header">
      <h1>Organization</h1>

      <form onSubmit={lookupOrgRepos}>
        <label>Enter Organization</label>
        <input type="text" id="org_name" value={newOrganization} onChange={handleChange} />
        <button type="submit">Search Repos</button>
      </form>

      {organization.repositories.edges.length? organization.repositories.edges.map(({ node }) => {
        return (
          <div key={node.id} className="RepositoryItem">
            <RepositoryItem {...node} />
          </div>
        )
      }) : <p>Could not find repositories for the specified organization"</p>}
    </div>
  )
}

Organization.defaultProps = {
  organizationLogin: "github"
}

export default Organization