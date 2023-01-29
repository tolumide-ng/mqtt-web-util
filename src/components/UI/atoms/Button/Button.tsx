import * as React from "react";
import styles from "./Button.module.css";

export type ButtonType = "submit" | "reset" | "button";

type ButtonProps = {
    text: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    type?: ButtonType;
    disabled?: boolean;
    className?: string;
};

export const Button = ({
    text,
    onClick,
    type,
    disabled = false,
    className,
}: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={`${styles.button} ${className}`}
            type={type}
            disabled={disabled}
        >
            {text}
        </button>
    );
};
