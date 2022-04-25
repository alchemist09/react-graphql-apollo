import './style.css'

const Loading = ({ position }) => {
  const default_style = 'LoadingMessage'
  const loading_position = position === 'top' ? `${default_style} Loading-top`: `${default_style} Loading-bottom`
  return (
    <div className={loading_position}>Loading.......</div>
  )
}

export default Loading