import * as React from "react";
import { Message, Status } from "../../../../types";
import styles from "./index.module.css";

type MessagesProps = {
    messages: Array<Message>;
    connectionStatus: Status;
};

export const Messages = ({ messages, connectionStatus }: MessagesProps) => {
    return (
        <div className={styles.messageTableWrapper}>
            <table className={styles.messageTable}>
                <thead className={styles.messageTableHead}>
                    <tr className={styles.messageTableRow}>
                        <th className={styles.messageTableRowHead}>Index</th>
                        <th className={styles.messageTableRowHead}>Message</th>
                        <th className={styles.messageTableRowHead}>Topic</th>
                        <th className={styles.messageTableRowHead}>QoS</th>
                    </tr>
                </thead>
                <tbody className={styles.messageTableBody}>
                    {messages.map(
                        ({ message, qos, topic, messageId }, index) => (
                            <tr
                                key={messageId}
                                className={styles.messageTableRow}
                            >
                                <td className={styles.messageTableData}>
                                    {index}
                                </td>
                                <td className={styles.messageTableData}>
                                    {message}
                                </td>
                                <td className={styles.messageTableData}>
                                    {topic}
                                </td>
                                <td className={styles.messageTableData}>
                                    {qos}
                                </td>
                            </tr>
                        ),
                    )}
                </tbody>
            </table>
            {connectionStatus === Status.Success && !messages?.length ? (
                <p className={styles.messageTableNoTopic}>
                    You do not have any messages at the moment
                </p>
            ) : null}

            {connectionStatus !== Status.Success ? (
                <p className={styles.messageTableNoTopic}>
                    Please connect to view available messages
                </p>
            ) : null}
        </div>
    );
};
