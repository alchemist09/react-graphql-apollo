const Link = ({ children, ...props }) => {
  return (
    <a {...props} target="_blank" rel="noopener noreferer">{children}</a>
  )
}

export default Link