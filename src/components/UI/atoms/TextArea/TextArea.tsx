import * as React from "react";
import styles from "./TextArea.module.css";

type TextAreaProps = {
    name: string;
    value: string;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    cols?: number;
    rows?: number;
    className?: string;
    disabled?: boolean;
    required?: boolean;
};

export const TextArea = ({
    name,
    value,
    placeholder,
    onChange,
    cols = 30,
    rows = 10,
    className,
    disabled = false,
    required = true,
}: TextAreaProps) => {
    return (
        <textarea
            name={name}
            cols={cols}
            rows={rows}
            onChange={onChange}
            value={value}
            className={`${styles.textArea} ${className}`}
            disabled={disabled}
            placeholder={placeholder}
            required={required}
            aria-label={name}
        ></textarea>
    );
};
