import RepositoryItem from "../RepositoryItem"
import '../../index.css'
import Loading from "../../Loading"
import FetchMore from "../../FetchMore"


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

      <FetchMore
        loading={loading}
        fetchMore={fetchMore}
        hasNextPage={repositories.pageInfo.hasNextPage}
        variables={{ cursor: repositories.pageInfo.endCursor }}
      >
        Repos
      </FetchMore>
    </>
  )
}

export default RepositoryList