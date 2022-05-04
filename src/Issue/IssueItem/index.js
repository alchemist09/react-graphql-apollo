const IssueItem = ({
  bodyHTML,
  number,
  state,
  title,
  url
}) => {
   return (
     <div>
        <h3><a href={url}>Issue &#x23;{number} - {title}</a></h3>
        <span>{state}</span>
        <p>
           {bodyHTML}
        </p>
     </div>
   )
}

export default IssueItem