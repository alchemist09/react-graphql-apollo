import Loading from "../Loading"
import { ButtonUnobtrusive } from "../Button"

const FetchMore = ({ loading, hasNextPage, fetchMore, variables, children }) => {
  return (
    <div className="FetchMore">
    {  
      loading ? <Loading /> : (
        hasNextPage && 
        <ButtonUnobtrusive
          type="button"
          className="FetchMore-button"
          onClick={() => {
            fetchMore({
              variables
            })
          }}
        >More {children}</ButtonUnobtrusive>
      )}
    </div>
  )
}

export default FetchMore