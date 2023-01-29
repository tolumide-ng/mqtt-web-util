import * as React from "react";
import { Status } from "../../../types";
import { Connection } from "../../UI/organisms/Connection";
import { CreateMessage } from "../../UI/organisms/CreateMessage";
import { Messages } from "../../UI/organisms/Messages";
import { Subscriptions } from "../../UI/organisms/Subscriptions";
import styles from "./index.module.css";
import { useHome } from "./useHome";

export const HomePage = () => {
    const {
        onConnect,
        appState: { messages, connectionStatus, topics },
        onSubscribe,
        onPublishMessage,
    } = useHome();

    const isConnected = connectionStatus === Status.Success;

    return (
        <main className={styles.home}>
            <h1 className={styles.homeTitle}>MQTT WebClient</h1>

            <div className={styles.homeContent}>
                <div className={styles.homeTop}>
                    <div>
                        <Connection
                            onConnect={onConnect}
                            connectionStatus={connectionStatus}
                        />
                    </div>
                    <div>
                        <CreateMessage
                            onPublishMessage={onPublishMessage}
                            isConnected={isConnected}
                        />
                    </div>
                </div>

                <div className={styles.homeBottom}>
                    <div>
                        <Subscriptions
                            onSubscribe={onSubscribe}
                            topics={topics}
                            isConnected={isConnected}
                        />
                    </div>
                    <div>
                        <Messages
                            messages={messages}
                            connectionStatus={connectionStatus}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
};
