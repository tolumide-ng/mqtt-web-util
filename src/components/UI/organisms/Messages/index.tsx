import * as React from "react";
import { Message } from "../../../../types";
import styles from "./index.module.css";

type MessagesProps = {
    messages: Array<Message>;
};

export const Messages = ({ messages }: MessagesProps) => {
    return (
        <>
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
            {!messages?.length ? (
                <p>You do not have any messages at the moment</p>
            ) : null}
        </>
    );
};
