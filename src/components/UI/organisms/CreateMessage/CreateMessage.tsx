import { QoS } from "precompiled-mqtt";
import * as React from "react";
import { Message } from "../../../../types";
import { Button } from "../../atoms/Button/Button";
import { Input } from "../../atoms/Input/Input";
import { SelectOption } from "../../atoms/SelectOption/SelectOption";
import { TextArea } from "../../atoms/TextArea/TextArea";
import styles from "./CreateMessage.module.css";

type MessagesProps = {
    onPublishMessage: (props: Message) => void;
    isConnected: boolean;
};

export const CreateMessage = ({
    onPublishMessage,
    isConnected,
}: MessagesProps) => {
    const [state, setState] = React.useState<Message>({
        topic: "",
        qos: 0, // Quality of service;
        message: "",
        messageId: null,
    });

    React.useEffect(() => {
        if (!isConnected) {
            // reset the state when a user disconnects while typing
            setState({ topic: "", qos: 0, message: "", messageId: null });
        }
    }, [isConnected]);

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
                    disabled={!isConnected}
                />

                <SelectOption
                    name="qos"
                    className={styles.inputService}
                    onChange={handleChange}
                    options={[0, 1, 2]}
                    value={state.qos}
                    disabled={!isConnected}
                />

                <TextArea
                    name="message"
                    value={state.message}
                    className={styles.inputMessage}
                    onChange={handleChange}
                    disabled={!isConnected}
                />

                <Button
                    type="submit"
                    text="Publish Message"
                    disabled={!isConnected}
                />
            </form>
        </section>
    );
};
