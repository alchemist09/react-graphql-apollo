import Link from "../../Link"
import '../../index.css'

const RepositoryItem = ({
  name,
  url,
  descriptionHTML,
  primaryLanguage,
  owner,
  stargazers
}) => {
  return (
    <div>
      <div className="RepositoryItem-title">
        <h2><Link href={url}>{name}</Link></h2>
        <div className="RepositoryItem-title-action">
          {stargazers.totalCount} Stars
        </div>
      </div>

      <div className="RepositoryItem-description">
        <div className="RepositoryItem-description-info" 
             dangerouslySetInnerHTML={{ __html: descriptionHTML}} />
        
        <div className="Repository-description-details">
          <div>
            {primaryLanguage && (<span>Language: {primaryLanguage.name}</span>)}
          </div>
          <div>
            {owner && (<span>Owner: <a href={owner.url}>{owner.login}</a></span>)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RepositoryItem