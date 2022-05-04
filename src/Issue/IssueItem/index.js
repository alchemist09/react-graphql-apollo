import Link from "../../Link"

const IssueItem = ({
  bodyHTML,
  number,
  state,
  title,
  url
}) => {
   return (
     <div>
        <h3><Link href={url}>&#35;{number}{' '}[{state}] - {title}</Link></h3>
        <div dangerouslySetInnerHTML={{ __html: bodyHTML }}></div>
     </div>
   )
}

export default IssueItem