import * as React from "react";
import { Status, Topic } from "../../../../types";
import { Button } from "../../atoms/Button";
import { Input } from "../../atoms/Input";
import { SubscribeRow } from "../../atoms/SubscribeRow";
import styles from "./index.module.css";

export type SubscriptionsProps = {
    topics: Array<Topic>;
    onSubscribe: (topic: string) => void;
    connectionStatus: Status;
};

export const Subscriptions = ({
    topics,
    onSubscribe,
    connectionStatus,
}: SubscriptionsProps) => {
    const [topic, setTopic] = React.useState("");

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubscribe(topic);
        setTopic("");
    };

    return (
        <section className={styles.subscriptions}>
            <h3 className={styles.subscriptionsTitle}>Subscriptions</h3>

            <form className={styles.subscriptionContent} onSubmit={onSubmit}>
                <Input
                    name="subscriptions"
                    inputType="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    inputClassName={styles.subscriptionOptions}
                    disabled={connectionStatus !== Status.Success}
                />

                <Button
                    text="Subscribe"
                    type="submit"
                    disabled={connectionStatus !== Status.Success}
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
