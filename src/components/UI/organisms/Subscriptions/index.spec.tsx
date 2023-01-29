import { render, screen } from "@testing-library/react";
import { Subscriptions, SubscriptionsProps } from ".";
import { Status, Topic } from "../../../../types";

describe("Subscriptions", () => {
    const getProps = ({
        topics = [],
        onSubscribe = jest.fn(),
        connectionStatus = Status.Rest,
    }: SubscriptionsProps) => ({
        topics,
        onSubscribe,
        connectionStatus,
    });

    it("should render the component", () => {
        const props = getProps({} as SubscriptionsProps);

        render(<Subscriptions {...props} />);

        expect(screen.getByRole("textbox")).toBeInTheDocument();
        expect(screen.getByRole("button")).toHaveTextContent("Subscribe");
        expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
        expect(screen.getByRole("button")).toBeDisabled();
    });

    it("should display the topics", () => {
        const topics: Array<Topic> = [
            { topic: "topicA", qos: 0 },
            { topic: "topicB", qos: 1 },
        ];

        const props = getProps({ topics } as SubscriptionsProps);

        render(<Subscriptions {...props} />);

        expect(
            screen.getByText(`${topics[0].topic}/${topics[0].qos}`),
        ).toBeVisible();
        expect(
            screen.getByText(`${topics[1].topic}/${topics[1].qos}`),
        ).toBeVisible();
    });
});
