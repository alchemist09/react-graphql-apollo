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
  const [ unStarRepo, { 
    data: data2, 
    loading: loading2, 
    error: error2 
  } ] = useMutation(REMOVE_STAR, { variables: { id } })

  if(loading || loading2) return <Loading />
  if(error || error2) {
    const currentError = error ? error : error2
    return <ErrorMessage error={currentError} />
  }

  let numStars = stargazers.totalCount
  let afterStarCount
  let unstarCount
  if(data && data2 === undefined) {
    if(data) console.log(data)
    if(data2) console.log(data2)
    const { stargazerCount: addStarCount } = data.addStar.starrable
    numStars = addStarCount
    afterStarCount = addStarCount
  } else {
    if(data2) {
      if(data) console.log(data)
      if(data2) console.log(data2)
      const { stargazerCount: removeStarCount } = data2.removeStar.starrable
      numStars = removeStarCount
      afterStarCount = data.addStar.starrable.stargazerCount
      unstarCount = removeStarCount
    }
  }

  console.log(`**** NAME ******: ${name}`)
  console.log(`stargazers.totalCount: ${stargazers.totalCount}`)
  console.log(`numStars: ${numStars}`)
  console.log(`afterStarCount: ${afterStarCount}`)
  console.log(`unstarCount: ${unstarCount}`)
  console.log('SOME RANDOM LINE___________________')

  return (
    <div>
      <div className="RepositoryItem-title">
        <h2><Link href={url}>{name}</Link></h2>
        <div className="RepositoryItem-title-action">
          {viewerHasStarred ? 
            <Button onClick={unStarRepo}
                    className={'RepositoryItem-title-action'}
            >{ afterStarCount ? afterStarCount : stargazers.totalCount } Unstar</Button> : 
            <Button onClick={starRepo}
                    className={'RepositoryItem-title-action'}
            >{ unstarCount ? unstarCount : stargazers.totalCount } Star</Button>}
          
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