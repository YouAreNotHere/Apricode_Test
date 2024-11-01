import "../App.css"

interface IButton{
    buttonName: string;
    onClickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
    text?: string,
    children?: React.ReactNode;
}

const Button = ({buttonName, onClickHandler, text, children}: IButton) =>{
    return(
        <button
            className={buttonName}
            onClick={onClickHandler}>
            {text}
            {children}
        </button>
    )
};

export default Button;