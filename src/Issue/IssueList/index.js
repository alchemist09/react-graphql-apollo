import { useQuery, gql } from '@apollo/client'
import ErrorMessage from '../../Error'
import Loading from '../../Loading'
import IssueItem from '../IssueItem'

import './style.css'

const GET_ISSUES_OF_REPOSITORY = gql`
  query($repositoryName: String!, $repositoryOwner: String!, $cursor: String) {
    repository(name: $repositoryName, owner: $repositoryOwner) {
      issues(first: 5, after: $cursor, orderBy: { field: UPDATED_AT, direction: ASC }) {
        edges {
          node {
            id
            bodyHTML
            number
            state
            title
            url
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`

const Issues = ({ repositoryName, repositoryOwner }) => {
  const { loading, error, data } = useQuery(GET_ISSUES_OF_REPOSITORY, {
    variables: {
      repositoryName,
      repositoryOwner
    }
  })

  if(error) {
    return <ErrorMessage error={error} />
  }

  if(loading && !data) {
    return <Loading position='top' />
  }

  const { repository } = data

  if(!repository.issues.edges.length) {
    return <div className='IssueLisit'>No issues...</div>
  }

  console.log(repository.issues)
  return <IssueList issues={repository.issues} />
}

const IssueList = ({ issues }) => {
  return (
    <div className='IssueList'>
      {issues.edges.map(({ node }) => {
        return <IssueItem key={node.id} {...node} />
      })}
    </div>
  )
}

export default Issues