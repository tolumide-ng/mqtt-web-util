import { ISubscriptionGrant, QoS } from "precompiled-mqtt";

export enum Status {
    Rest = "rest",
    Loading = "loading",
    Failure = "failure",
    Success = "success",
}

export type ConnectProps = {
    username: string;
    password: string;
    hostname: string;
};

export type Message = {
    topic: string;
    message: string;
    qos: QoS; // Quality of Service
    messageId: string | null;
};

export type Topic = Pick<ISubscriptionGrant, "qos" | "topic">;

export type UpdateTopic = (topics: Array<ISubscriptionGrant>) => void;

export type UpdateHandle = (status: Status, messages: Array<Message>) => void;

export type MQTTClientProps = ConnectProps & { updateHandle: UpdateHandle };
