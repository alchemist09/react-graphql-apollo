import Loading from "../Loading"

const FetchMore = ({ loading, hasNextPage, fetchMore, variables, children }) => {
  return (
    <div className="FetchMore">
    {  
      loading ? <Loading /> : (
        hasNextPage && 
        <button
          type="button"
          className="FetchMore-button"
          onClick={() => {
            fetchMore({
              variables
            })
          }}
        >More {children}</button>
      )}
    </div>
  )
}

export default FetchMore