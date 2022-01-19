import Loading from "../Loading"

const FetchMore = ({ loading, hasNextPage, fetchMore, variables, children }) => {
  return (
    <>
    {  
      loading ? <Loading /> : (
        hasNextPage && 
        <button
          onClick={() => {
            fetchMore({
              variables
            })
          }}
        >More {children}</button>
      )}
    </>
  )
}

export default FetchMore