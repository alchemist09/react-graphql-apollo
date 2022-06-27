import { useLazyQuery, gql, ApolloConsumer } from '@apollo/client'
import { useState } from 'react'
import ErrorMessage from '../../Error'
import FetchMore from '../../FetchMore'
import Loading from '../../Loading'
import IssueItem from '../IssueItem'
import { ButtonUnobtrusive } from '../../Button'

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
  [ISSUE_STATE.CLOSED]: 'Hide Issues'
}

const isShow = issueState => issueState !== ISSUE_STATE.NONE

const GET_ISSUES_OF_REPOSITORY = gql`
  query($repositoryName: String!, $repositoryOwner: String!, $issueState: IssueState!, $cursor: String) {
    repository(name: $repositoryName, owner: $repositoryOwner) {
      issues(first: 5, states: [$issueState], after: $cursor, orderBy: { field: UPDATED_AT, direction: ASC }) {
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
    notifyOnNetworkStatusChange: true
  })

  const onChangeIssueState = issueState => {
    setIssueState(issueState)
    isShow(issueState) && fetchIssues({
      variables: {
        repositoryName,
        repositoryOwner,
        issueState
      }
    })
  }

  if(called && error) {
    return <ErrorMessage error={error} />
  }

  if(called && loading && !data) {
    return <Loading position='bottom' />
  }

  if(called && data) {
    const { repository } = data

    if(!repository.issues.edges.length) {
      return <div className='IssueList'>No issues...</div>
    }

    console.log(repository.issues)

    if(issueState === ISSUE_STATE.NONE) {
      return  <IssueFilter issueState={issueState} onChangeIssueState={onChangeIssueState} />
    }
    
    return isShow(issueState) && <IssueList 
    loading={loading}
    issues={repository.issues}
    fetchMore={fetchMore}
    issueState={issueState}
    onChangeIssueState={onChangeIssueState}
   />
  }

  return <IssueFilter issueState={issueState} onChangeIssueState={onChangeIssueState} />
}

const prefetchIssues = () => {

}

const IssueFilter = ({ issueState, onChangeIssueState, repositoryOwner, repositoryName }) => (
  <ApolloConsumer>
  {client => (
    <ButtonUnobtrusive
      onClick={() => onChangeIssueState(TRANSITION_STATE[issueState])}
      onMouseOver={() => prefetchIssues(client, repositoryOwner, repositoryName, issueState)}
    >
      {TRANSITION_LABELS[issueState]}
    </ButtonUnobtrusive>
  )}
  </ApolloConsumer>
)

const IssueList = ({ loading, issues, fetchMore, issueState, onChangeIssueState, repositoryName, repositoryOwner }) => {
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

      <IssueFilter 
        issueState={issueState} 
        onChangeIssueState={onChangeIssueState}
        repositoryName={repositoryName}
        repositoryOwner={repositoryOwner}
      />
    </>
  )
}

export default Issues