const ErrorMessage = ({ error }) => {
  return (
    <div className="ErrorMessagee">
      <small>{error.toString()}</small>
    </div>
  )
}

export default ErrorMessage