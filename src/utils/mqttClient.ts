import mqtt, { MqttClient } from "precompiled-mqtt";
import {
    Message,
    MQTTClientProps,
    Status,
    UpdateHandle,
    UpdateTopic,
} from "../types";

// Facade pattern
export class MQTTClient {
    client: MqttClient | null = null;
    #topics: Array<string> = [];
    #messages: Array<Message> = [];
    #connectionStatus = Status.Rest;

    constructor({
        username,
        password,
        hostname,
        updateHandle,
    }: MQTTClientProps) {
        this.client = mqtt.connect({
            clientId: "mqttjs_" + Math.random().toString(16).substring(2, 10),
            protocol: "wss",
            hostname,
            protocolVersion: 4,
            port: 8884,
            path: "/mqtt",
            clean: true,
            resubscribe: false,
            keepalive: 60,
            reconnectPeriod: 0,
            username,
            password,
        });

        updateHandle(Status.Loading, this.#messages);
        this.#activateListeners(updateHandle);
    }

    get status(): Status {
        return this.#connectionStatus;
    }

    #activateListeners(update: UpdateHandle) {
        this.client?.on("connect", (packet) => {
            this.#connectionStatus = Status.Success;
            update(Status.Success, this.#messages);
        });

        this.client?.on("end", () => {
            this.#connectionStatus = Status.Rest;
            update(Status.Rest, []);
        });

        this.client?.on("message", (topic, payload, packet) => {
            this.#messages.push({
                topic,
                message: payload.toString(),
                qos: packet.qos,
                messageId: `${topic}-${this.#messages.length}`,
            });

            update(Status.Success, this.#messages);
        });

        this.client?.on("error", () => {
            this.#connectionStatus = Status.Failure;
            update(Status.Failure, []);
        });
    }

    publish({ topic, message, qos }: Message) {
        this.client?.publish(topic, message, { qos });
    }

    subscribe(topic: string, update: UpdateTopic) {
        this.#topics.push(topic);

        this.client?.subscribe(this.#topics, (err, grant) => {
            if (!err) {
                update(grant);
            }
        });
    }

    close() {
        this.client?.end(true, undefined, () => {});
    }
}
