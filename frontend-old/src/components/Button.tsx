interface Props {
    children : string
    color?: string
    onClick:() => void;
}
const Button = ({children}: Props) => {
    return(
        <button className='btn btn-primary'>{children}</button>
    )
}
export default Button