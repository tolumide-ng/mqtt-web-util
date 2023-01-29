import { QoS } from "precompiled-mqtt";
import * as React from "react";
import { ConnectProps, Message, Status, Topic } from "../../../types";
import { MQTTClient } from "../../../utils/mqttClient";

type HomeState = {
    messages: Array<Message>;
    connectionStatus: Status;
    topics: Array<Topic>;
};

export const useHome = () => {
    const client: React.MutableRefObject<null | MQTTClient> =
        React.useRef(null);

    const [appState, setAppState] = React.useState<HomeState>({
        messages: [],
        connectionStatus: Status.Rest,
        topics: [],
    });

    const onConnect = React.useCallback((props: ConnectProps) => {
        if (client.current?.status === Status.Success) {
            client.current.close();
        } else {
            client.current = new MQTTClient({
                ...props,
                updateHandle: (status: Status, messages: Array<Message>) => {
                    setAppState((state) => ({
                        ...state,
                        connectionStatus: status,
                        messages,
                    }));
                },
            });
        }
    }, []);

    const onSubscribe = (topic: string, qos: QoS) => {
        const currentSubscriptions = appState.topics.map(
            (s) => `${s.topic}-${s.qos}`,
        );

        if (currentSubscriptions.includes(`${topic}-${qos}`)) {
            return;
        }

        client.current?.subscribe(topic, qos, (topics) => {
            setAppState((state) => ({ ...state, topics }));
        });
    };

    const onPublishMessage = (props: Message) => {
        client.current?.publish(props);
    };

    return {
        appState,
        onConnect,
        onSubscribe,
        onPublishMessage,
    };
};
