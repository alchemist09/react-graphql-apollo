import RepositoryItem from "../RepositoryItem"
import '../../index.css'

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
        repositories.pageInfo.hasNexPage && (
          <button
            type="button"
            onClick={() => {
              fetchMore({
                variables: {
                  cursor: repositories.pageInfo.endCursor
                }
              })
            }}
          >More Repos</button>
        )
      }
    </>
  )
}

export default RepositoryList