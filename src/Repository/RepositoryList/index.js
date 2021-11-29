import RepositoryItem from "../RepositoryItem"
import '../../index.css'

const RepositoryList = ({ repositories }) => {
  return (
    repositories.edges.map(({ node }) => (
      <div key={node.id} className="RepositoryItem">
        <RepositoryItem {...node} />
      </div>
    ))
  )
}

export default RepositoryList