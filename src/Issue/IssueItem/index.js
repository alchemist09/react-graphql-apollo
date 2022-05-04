const IssueItem = ({
  bodyHTML,
  number,
  state,
  title,
  url
}) => {
   return (
     <div>
        <h3><a href={url}>&#35;{number}{' '}[{state}] - {title}</a></h3>
        <div dangerouslySetInnerHTML={{ __html: bodyHTML }}></div>
     </div>
   )
}

export default IssueItem