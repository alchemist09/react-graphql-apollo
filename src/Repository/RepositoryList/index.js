import RepositoryItem from "../RepositoryItem"
import FetchMore from "../../FetchMore"
import '../../index.css'
import '../style.css'
import Issues from "../../Issue"


const RepositoryList = ({ loading, repositories, fetchMore }) => {
  return (
    <>
      {
        repositories.edges.map(({ node }) => (
          <div key={node.id} className="RepositoryItem">
            <RepositoryItem {...node} />
            <Issues
              repositoryName={node.name}
              repositoryOwner={node.owner.login}
            />
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