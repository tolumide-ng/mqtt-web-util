import * as React from "react";
import styles from "./index.module.css";

type SelectOptionProps = {
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: Array<string | number>;
    name: string;
    value: string | number;
    className?: string;
};

export const SelectOption = ({
    onChange,
    options,
    name,
    value,
    className,
}: SelectOptionProps) => {
    return (
        <select
            name={name}
            className={`${styles.select} ${className}`}
            onChange={onChange}
            aria-label={name}
        >
            {options.map((current) => (
                <option value={current} key={current}>
                    {current}
                </option>
            ))}
        </select>
    );
};
