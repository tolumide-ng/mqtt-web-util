import * as React from "react";
import styles from "./SelectOption.module.css";

type SelectOptionProps = {
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: Array<string | number>;
    name: string;
    value: string | number;
    className?: string;
    disabled?: boolean;
};

export const SelectOption = ({
    onChange,
    options,
    name,
    value,
    className,
    disabled = false,
}: SelectOptionProps) => {
    return (
        <select
            name={name}
            className={`${styles.select} ${className}`}
            onChange={onChange}
            aria-label={name}
            disabled={disabled}
            value={value}
        >
            {options.map((current) => (
                <option value={current} key={current}>
                    Quality of Service = {current}
                </option>
            ))}
        </select>
    );
};
