import { gql, useMutation } from '@apollo/client'
import Link from "../../Link"
import '../../index.css'
import Loading from '../../Loading'
import ErrorMessage from '../../Error'

const STAR_REPOSITORY = gql`
  mutation($id: ID!) {
    addStar(input: { starrableId: $id }) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`

const RepositoryItem = ({
  id,
  name,
  url,
  descriptionHTML,
  primaryLanguage,
  owner,
  stargazers
}) => {
  const [ starRepo, { loading, error } ]   = useMutation(STAR_REPOSITORY)
  if(loading) return <Loading />
  if(error) return <ErrorMessage error={error} />
  return (
    <div>
      <div className="RepositoryItem-title">
        <h2><Link href={url}>{name}</Link></h2>
        <div className="RepositoryItem-title-action">
          <button onClick={() => {
            starRepo({ variables: { starrableId: id } })
          }}>{stargazers.totalCount} Stars </button>
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