import { QoS } from "precompiled-mqtt";
import * as React from "react";
import { Topic } from "../../../../types";
import { Button } from "../../atoms/Button/Button";
import { Input } from "../../atoms/Input/Input";
import { SelectOption } from "../../atoms/SelectOption/SelectOption";
import { SubscribeRow } from "../../atoms/SubscribeRow/SubscribeRow";
import styles from "./Subscriptions.module.css";

export type SubscriptionsProps = {
    topics: Array<Topic>;
    onSubscribe: (topic: string, qos: QoS) => void;
    isConnected: boolean;
};

export const Subscriptions = ({
    topics,
    onSubscribe,
    isConnected,
}: SubscriptionsProps) => {
    const [state, setState] = React.useState<Topic>({
        topic: "",
        qos: 0,
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        const { name, value } = e.target;
        setState((state) => ({ ...state, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubscribe(state.topic, Number(state.qos) as QoS);
        setState({ topic: "", qos: 0 });
    };

    return (
        <section className={styles.subscriptions}>
            <h3 className={styles.subscriptionsTitle}>Subscriptions</h3>

            <form
                className={styles.subscriptionContent}
                onSubmit={handleSubmit}
            >
                <div className={styles.subscriptionOptions}>
                    <Input
                        name="topic"
                        inputType="text"
                        value={state.topic}
                        onChange={handleChange}
                        inputClassName={styles.subscriptionTopic}
                        disabled={!isConnected}
                    />
                    <SelectOption
                        name="qos"
                        options={[0, 1, 2]}
                        onChange={handleChange}
                        value={state.qos}
                        className={styles.subscriptionQos}
                        disabled={!isConnected}
                    />
                </div>

                <Button
                    text="Subscribe"
                    type="submit"
                    disabled={!isConnected}
                />
            </form>

            <div className={styles.subscriptionsContents}>
                {topics.map(({ topic, qos }) => (
                    <SubscribeRow name={`${topic}/${qos}`} key={topic} />
                ))}
            </div>
        </section>
    );
};
