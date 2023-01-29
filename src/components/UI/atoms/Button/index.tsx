import * as React from "react";
import styles from "./index.module.css";

export type ButtonType = "submit" | "reset" | "button";

type ButtonProps = {
    text: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    type?: ButtonType;
    disabled?: boolean;
};

export const Button = ({
    text,
    onClick,
    type,
    disabled = false,
}: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={styles.button}
            type={type}
            disabled={disabled}
        >
            {text}
        </button>
    );
};
