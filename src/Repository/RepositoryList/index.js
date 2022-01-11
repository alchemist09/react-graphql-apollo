import RepositoryItem from "../RepositoryItem"
import '../../index.css'

const mergeQueryResults = (previousResults, { fetchMoreResult }) => {
  if(!fetchMoreResult) {
    return previousResults
  }

  return {
    ...previousResults,
    viewer: {
      ...previousResults.viewer,
      repositories: {
        ...previousResults.viewer.repositories,
        ...fetchMoreResult.viewer.repositories,
        edges: [
          ...previousResults.viewer.repositories.edges,
          ...fetchMoreResult.viewer.repositories.edges
        ]
      }
    }
  }
}

const RepositoryList = ({ repositories, fetchMore }) => {
  return (
    <>
      {
        repositories.edges.map(({ node }) => (
          <div key={node.id} className="RepositoryItem">
            <RepositoryItem {...node} />
          </div>
        ))
      }

      {
        repositories.pageInfo.hasNextPage && (
          <button
            type="button"
            onClick={() => {
              fetchMore({
                variables: {
                  cursor: repositories.pageInfo.endCursor
                },
                updateQuery: mergeQueryResults
              })
            }}
          >More Repos</button>
        )
      }
    </>
  )
}

export default RepositoryList