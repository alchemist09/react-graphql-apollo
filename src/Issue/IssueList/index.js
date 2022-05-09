import { useQuery, useLazyQuery, gql } from '@apollo/client'
import { useState } from 'react'
import ErrorMessage from '../../Error'
import FetchMore from '../../FetchMore'
import Loading from '../../Loading'
import IssueItem from '../IssueItem'

import './style.css'

const ISSUE_STATE = {
  NONE: 'NONE',
  OPEN: 'OPEN',
  CLOSED: 'CLOSED'
}

const TRANSITION_STATE = {
  [ISSUE_STATE.NONE]: ISSUE_STATE.OPEN,
  [ISSUE_STATE.OPEN]: ISSUE_STATE.CLOSED,
  [ISSUE_STATE.CLOSED]: ISSUE_STATE.NONE
}

const TRANSITION_LABELS = {
  [ISSUE_STATE.NONE]: 'Show Open Issues',
  [ISSUE_STATE.OPEN]: 'Show Closed Issues',
  [ISSUE_STATE.NONE]: 'Hide Issues'
}

const isShow = issueState => issueState !== ISSUE_STATE.NONE

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
  const [issueState, setIssueState] = useState(ISSUE_STATE.NONE)
  const [fetchIssues, { called, loading, error, data, fetchMore }] = useLazyQuery(GET_ISSUES_OF_REPOSITORY, {
    variables: {
      repositoryName,
      repositoryOwner
    },
    notifyOnNetworkStatusChange: true
  })

  if(called && error) {
    return <ErrorMessage error={error} />
  }

  if(called && loading && !data) {
    return <Loading position='top' />
  }

  if(called && data) {
    const { repository } = data
    if(!repository.issues.edges.length) {
      return <div className='IssueLisit'>No issues...</div>
    }

    console.log(repository.issues)

    return isShow(issueState) && <IssueList 
    loading={loading}
    issues={repository.issues}
    fetchMore={fetchMore}
   />
  }

  return ''
}

const IssueList = ({ loading, issues, fetchMore }) => {
  return (
    <>
      <div className='IssueList'>
        {issues.edges.map(({ node }) => {
          return <IssueItem key={node.id} {...node} />
        })}
      </div>

      <FetchMore
        loading={loading}
        hasNextPage={issues.pageInfo.hasNextPage}
        variables={{ cursor: issues.pageInfo.endCursor }}
        fetchMore={fetchMore}
      >Issues</FetchMore>
    </>
  )
}

export default Issues