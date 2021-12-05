import { gql, useMutation } from '@apollo/client'
import Link from "../../Link"
import '../../index.css'
import Loading from '../../Loading'
import ErrorMessage from '../../Error'
import Button from '../../Button'

const STAR_REPOSITORY = gql`
  mutation($id: ID!) {
    addStar(input: { starrableId: $id }) {
      starrable {
        id
        viewerHasStarred
        stargazerCount
      }
    }
  }
`

const REMOVE_STAR = gql`
  mutation($id: ID!) {
    removeStar(input: { starrableId: $id}) {
      starrable {
        id
        viewerHasStarred
        stargazerCount
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
  stargazers,
  viewerHasStarred
}) => {
  const [ starRepo, { data, loading, error } ] = useMutation(STAR_REPOSITORY, { variables: { id } })
  const [ unStarRepo, { data2, loading2, error2 } ] = useMutation(REMOVE_STAR, { variables: { id } })

  if(loading || loading2) return <Loading />
  if(error || error2) return <ErrorMessage error={error} />

  let numStars
  if(data || data2) {
    if(data) console.log(data)
    if(data2) console.log(data2)
    const { stargazerCount } =  data ? data.addStar.starrable : data2.removeStar.starrable
    numStars = stargazerCount
  }

  return (
    <div>
      <div className="RepositoryItem-title">
        <h2><Link href={url}>{name}</Link></h2>
        <div className="RepositoryItem-title-action">
          {viewerHasStarred ? 
            <Button onClick={unStarRepo}
                    className={'RepositoryItem-title-action'}
            >{ numStars ? numStars : stargazers.totalCount} Unstar</Button> : 
            <Button onClick={starRepo}
                    className={'RepositoryItem-title-action'}
            >{ numStars ? numStars : stargazers.totalCount} Star</Button>}
          
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