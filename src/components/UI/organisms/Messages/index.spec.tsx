import { render, screen } from "@testing-library/react";
import { Messages } from ".";
import { Message } from "../../../../types";

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
        render(<Messages messages={[]} />);

        expect(screen.getByText("Index")).toBeVisible();
        expect(screen.getByText("Message")).toBeVisible();
        expect(screen.getByText("Topic")).toBeVisible();
        expect(screen.getByText("QoS")).toBeVisible();
        expect(
            screen.getByText("You do not have any messages at the moment"),
        ).toBeVisible();
    });

    it("should display the messages if they exist", () => {
        render(<Messages messages={props} />);

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
});
