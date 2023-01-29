import * as React from "react";
import styles from "./index.module.css";

type InputProps = {
    inputType: React.HTMLInputTypeAttribute;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    disabled?: boolean;
    name: string;
    value: string;
    required?: boolean;
};

export const Input = ({
    onChange,
    inputType,
    placeholder,
    disabled = false,
    value,
    name,
    required = true,
}: InputProps) => {
    return (
        <input
            className={styles.input}
            type={inputType}
            required={required}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            value={value}
            name={name}
            aria-label={name}
        />
    );
};
