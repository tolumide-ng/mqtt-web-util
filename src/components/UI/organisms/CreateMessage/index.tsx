import { QoS } from "precompiled-mqtt";
import * as React from "react";
import { Message, Status } from "../../../../types";
import { Button } from "../../atoms/Button";
import { Input } from "../../atoms/Input";
import { SelectOption } from "../../atoms/SelectOption";
import { TextArea } from "../../atoms/TextArea";
import styles from "./index.module.css";

type MessagesProps = {
    onPublishMessage: (props: Message) => void;
    connectionStatus: Status;
};

export const CreateMessage = ({
    onPublishMessage,
    connectionStatus,
}: MessagesProps) => {
    const [state, setState] = React.useState<Message>({
        topic: "",
        qos: 0, // Quality of service;
        message: "",
        messageId: null,
    });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLTextAreaElement | HTMLSelectElement | HTMLInputElement
        >,
    ) => {
        const { name, value } = e.target;
        if (name === "qos") {
            setState((state) => ({
                ...state,
                [name]: Number(value) as unknown as QoS,
            }));
        } else {
            setState((state) => ({ ...state, [name]: value }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onPublishMessage(state);
    };

    return (
        <section className={styles.messages}>
            <h3 className={styles.messagesTitle}>Messages</h3>

            <form onSubmit={handleSubmit} className={styles.messagesContent}>
                <Input
                    inputType={"text"}
                    onChange={handleChange}
                    name="topic"
                    value={state.topic}
                    inputClassName={styles.inputTopic}
                    placeholder="Topic"
                    disabled={connectionStatus !== Status.Success}
                />

                <SelectOption
                    name="qos"
                    className={styles.inputService}
                    onChange={handleChange}
                    options={[0, 1, 2]}
                    value={state.qos}
                    disabled={connectionStatus !== Status.Success}
                />

                <TextArea
                    name="message"
                    value={state.message}
                    className={styles.inputMessage}
                    onChange={handleChange}
                    disabled={connectionStatus !== Status.Success}
                />

                <Button
                    type="submit"
                    text="Publish Message"
                    disabled={connectionStatus !== Status.Success}
                />
            </form>
        </section>
    );
};
