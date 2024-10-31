import "../App.css"

interface IButton{
    buttonName: string;
    onClickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
    text?: string,
}

const Button = ({buttonName, onClickHandler, text}: IButton) =>{
    return(
        <button
            className={buttonName}
            onClick={onClickHandler}>
            {text}
        </button>
    )
};

export default Button;