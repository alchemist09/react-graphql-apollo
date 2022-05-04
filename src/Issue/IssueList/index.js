import { useQuery, gql } from '@apollo/client'
import ErrorMessage from '../../Error'
import Loading from '../../Loading'

const GET_ISSUES_OF_REPOSITORY = gql`
  query($repositoryName: String!, $repositoryOwner: String!) {
    repository(name: $repositoryName, owner: $repositoryOwner) {
      issues(first: 5) {
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

  if(!data) { return null }

  return (
    <div className='issues'>
    
    </div>
  )
}

const IssueList = ({ issues }) => {
  return (
    <div className='IssueList'>
    
    </div>
  )
}

export default Issues