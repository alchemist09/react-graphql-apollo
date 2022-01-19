import RepositoryItem from "../RepositoryItem"
import '../../index.css'
import Loading from "../../Loading"


const RepositoryList = ({ loading, repositories, fetchMore }) => {
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
        loading ? <Loading /> :
        (repositories.pageInfo.hasNextPage && (
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
        ))
      }
    </>
  )
}

export default RepositoryList