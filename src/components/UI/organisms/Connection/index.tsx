import * as React from "react";
import { ConnectProps, Status } from "../../../../types";
import { Button } from "../../atoms/Button";
import { Input } from "../../atoms/Input";
import styles from "./index.module.css";

type Option = {
    name: keyof ConnectProps;
    placeholder: string;
    className: string;
    type: string;
};

type ConnectionProps = {
    onConnect: (props: ConnectProps) => void;
    connectionStatus: Status;
};

export const Connection = ({
    onConnect,
    connectionStatus,
}: ConnectionProps) => {
    const isConnected = connectionStatus === Status.Success;

    const [state, setState] = React.useState<ConnectProps>({
        hostname: "",
        username: "",
        password: "",
    });

    const handleChange = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setState((state) => ({ ...state, [name]: value }));
        },
        [],
    );

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isConnected) {
            setState({ hostname: "", username: "", password: "" });
        }
        onConnect(state);
    };

    const options: Array<Option> = [
        {
            name: "hostname",
            className: styles.hostname,
            placeholder: "Hostname",
            type: "text",
        },
        {
            name: "username",
            className: styles.username,
            placeholder: "Username",
            type: "text",
        },
        {
            name: "password",
            className: styles.password,
            placeholder: "Password",
            type: "password",
        },
    ];

    return (
        <form onSubmit={onSubmit} className={styles.connection}>
            <h3 className={styles.connectionTitle}>Connection</h3>

            <div className={styles.connectionContent}>
                {options.map(({ name, className, placeholder, type }) => (
                    <Input
                        key={name}
                        inputType={type}
                        onChange={handleChange}
                        name={name}
                        value={state[name]}
                        inputClassName={className}
                        placeholder={placeholder}
                        required={true}
                    />
                ))}
            </div>

            <Button
                text={isConnected ? "Disconnect" : "Connect"}
                className={styles.submitButton}
            />
        </form>
    );
};