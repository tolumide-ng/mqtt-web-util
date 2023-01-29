import * as React from "react";
import styles from "./index.module.css";

type SubscribeRowProps = {
    name: string;
};

export const SubscribeRow = ({ name }: SubscribeRowProps) => {
    return (
        <section className={styles.row}>
            &#10003;
            <span className={styles.rowName}>{name}</span>
        </section>
    );
};
