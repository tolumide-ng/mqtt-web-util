import { render, screen } from "@testing-library/react";
import { Messages } from "./Messages";
import { Message, Status } from "../../../../types";

describe("Messages", () => {
    const props: Array<Message> = [
        {
            topic: "first topic",
            message: "for other Humans",
            qos: 2,
            messageId: "first-human",
        },
        {
            topic: "second topic",
            message: "Aliens attention!",
            qos: 2,
            messageId: "first-alien",
        },
    ];

    it("should display text when there are no messages", () => {
        render(<Messages messages={[]} connectionStatus={Status.Rest} />);

        expect(screen.getByText("Index")).toBeVisible();
        expect(screen.getByText("Message")).toBeVisible();
        expect(screen.getByText("Topic")).toBeVisible();
        expect(screen.getByText("QoS")).toBeVisible();
        expect(
            screen.queryByText("You do not have any messages at the moment"),
        ).not.toBeInTheDocument();
        expect(
            screen.getByText("Please connect to view available messages"),
        ).toBeVisible();
    });

    it("should display the messages if they exist", () => {
        render(<Messages messages={props} connectionStatus={Status.Success} />);

        expect(
            screen.queryByText("You do not have any messages at the moment"),
        ).not.toBeInTheDocument();
        expect(
            screen.getByRole("cell", { name: props[0].message }),
        ).toBeVisible();
        expect(
            screen.getByRole("cell", { name: props[1].message }),
        ).toBeVisible();
        expect(
            screen.getByRole("cell", { name: props[0].topic }),
        ).toBeVisible();
        expect(
            screen.getByRole("cell", { name: props[1].topic }),
        ).toBeVisible();
        expect(screen.getByRole("cell", { name: "0" })).toBeVisible();
        expect(screen.getByRole("cell", { name: "1" })).toBeVisible();
        expect(screen.getAllByRole("cell", { name: "2" })).toHaveLength(2);
    });

    it("should display the appropriate message if user is connected yet and there are no messages yet", () => {
        render(<Messages messages={[]} connectionStatus={Status.Success} />);

        expect(
            screen.getByText("You do not have any messages at the moment"),
        ).toBeVisible();
        expect(
            screen.queryByText("Please connect to view available messages"),
        ).not.toBeInTheDocument();
    });
});
