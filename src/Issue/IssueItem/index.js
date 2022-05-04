import Link from "../../Link"

import "./style.css"

const IssueItem = ({
  bodyHTML,
  number,
  state,
  title,
  url
}) => {
   return (
     <div className="IssueItem">
        <div className="IssueItem-content">
          <h3><Link href={url}>&#35;{number}{' '}[{state}] - {title}</Link></h3>
          <div dangerouslySetInnerHTML={{ __html: bodyHTML }}></div>
        </div>
     </div>
   )
}

export default IssueItem