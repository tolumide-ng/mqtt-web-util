import * as React from "react";

type TextAreaProps = {
    name: string;
    value: string;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    cols?: number;
    rows?: number;
    className?: string;
    disabled?: boolean;
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
}: TextAreaProps) => {
    return (
        <textarea
            name={name}
            cols={cols}
            rows={rows}
            onChange={onChange}
            value={value}
            className={className}
            disabled={disabled}
            placeholder={placeholder}
        ></textarea>
    );
};
