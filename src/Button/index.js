import './style.css'

const Button = ({ children, className, color='black', type='button', ...props }) => {
  return (
    <button className={`${className} Button Button_${color}`}
            type={type}
            {...props}
    >{children}</button>
  )
}

const ButtonUnobtrusive = ({ children, className, type='button', ...props }) => {
  return (
    <div className='FetchMore'>
      <button
        className={`${className} Button_unobtrusive`}
        type={type}
        {...props}
      >{children}</button>
    </div>
  )
}

export { ButtonUnobtrusive }

export default Button