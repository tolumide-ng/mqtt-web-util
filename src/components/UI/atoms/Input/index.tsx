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
    inputClassName?: string;
};

export const Input = ({
    onChange,
    inputType,
    placeholder,
    disabled = false,
    value,
    name,
    required = true,
    inputClassName,
}: InputProps) => {
    return (
        <input
            className={`${styles.input} ${inputClassName}`}
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
