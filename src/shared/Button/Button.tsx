import "../../App.scss"
import './Button.scss';
import React, {ReactNode} from "react";

interface IButton{
    className: string;
    onClickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
    text?: string,
    children?: ReactNode;
}

const Button = ({className, onClickHandler, text, children}: IButton) => {
    return(
        <button
            className={`button ${className}`}
            onClick={onClickHandler}
        >
            {text}
            {children}
        </button>
    )
};

export { Button };