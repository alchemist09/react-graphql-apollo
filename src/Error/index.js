import './style.css'

const ErrorMessage = ({ error }) => {
  return (
    <div className="ErrorMessage">
      <p><small>{error.toString()}</small></p>
    </div>
  )
}

export default ErrorMessage