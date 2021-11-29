import RepositoryItem from "../RepositoryItem"
import '../style.css'

const RepositoryList = ({ respoitories }) => {
  return (
    respoitories.edges.map(({ node }) => (
      <div key={node.id} className="RepositoryItem">
        <RepositoryItem {...node} />
      </div>
    ))
  )
}

export default RepositoryList