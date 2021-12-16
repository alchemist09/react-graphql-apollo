import { gql, useMutation } from '@apollo/client'
import Link from "../../Link"
import '../../index.css'
import Loading from '../../Loading'
import ErrorMessage from '../../Error'
import Button from '../../Button'
import { REPOSITORY_FRAGMENT } from '..'

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

const WATCH_REPOSITORY = gql`
  mutation($id: ID!,  $viewerSubscription: SubscriptionState!) {
    updateSubscription(input: { subscribableId: $id, state: $viewerSubscription }) {
      subscribable {
        id
        viewerSubscription
      }
    }
  }
`

const updateAddStar = (cache, { data: { addStar } }) => {
  const repo_id = addStar.starrable.id
  const repo = cache.readFragment({
    id: `Repository:${repo_id}`,
    fragment: REPOSITORY_FRAGMENT
  })

  const totalCount = repo.stargazers.totalCount + 1
  cache.writeFragment({
    id: `Repository:${repo_id}`,
    fragment: REPOSITORY_FRAGMENT,
    data: {
      stargazers: {
        ...repo.stargazers,
        totalCount
      }
    }
  })
}

const SUBSCRIPTION_STATES = {
  SUBSCRIBED: 'SUBSCRIBED',
  UNSUBSCRIBED: 'UNSUBSCRIBED'
}

const isWatch = viewerSubscription => viewerSubscription === SUBSCRIPTION_STATES.SUBSCRIBED

const RepositoryItem = ({
  id,
  name,
  url,
  descriptionHTML,
  primaryLanguage,
  owner,
  stargazers,
  viewerHasStarred,
  viewerSubscription
}) => {
  const [ starRepo, { data, loading, error } ] = useMutation(STAR_REPOSITORY, { variables: { id } },
    updateAddStar)
  const [ unStarRepo, { data: data2, loading: loading2, error: error2 } ] = useMutation(REMOVE_STAR, 
                                                                                       { variables: { id } })
  const [ updateSubscription, { data: data3, loading: loading3, error: error3 }] = useMutation(WATCH_REPOSITORY)

  if(loading || loading2 || loading3) return <Loading />
  if(error || error2 || error3) {
    let currentError
    if(error) currentError = error
    if(error2) currentError = error2
    if(error3) currentError = error3
    return <ErrorMessage error={currentError} />
  }

  return (
    <div>
      <div className="RepositoryItem-title">
        <h2><Link href={url}>{name}</Link></h2>
        <div className="RepositoryItem-title-action">
          {viewerHasStarred ? 
            <Button onClick={unStarRepo}
                    className={'RepositoryItem-title-action'}
            >{ data ? data.addStar.starrable.stargazerCount : stargazers.totalCount } Unstar</Button> : 
            <Button onClick={starRepo}
                    className={'RepositoryItem-title-action'}
            >{ data2 ? data2.removeStar.starrable.stargazerCount : stargazers.totalCount } Star</Button>}
            {viewerSubscription === 'SUBSCRIBED' ?
            <Button onClick={updateSubscription} >Unwatch</Button> : <Button onClick={updateSubscription}>Watch</Button>
          }
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