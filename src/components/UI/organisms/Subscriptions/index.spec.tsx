import { render, screen } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import { Subscriptions, SubscriptionsProps } from ".";
import { Topic } from "../../../../types";

describe("Subscriptions", () => {
    const getProps = ({
        topics = [],
        onSubscribe = jest.fn(),
        isConnected = false,
    }: SubscriptionsProps) => ({
        topics,
        onSubscribe,
        isConnected,
    });

    it("should render the component", () => {
        const props = getProps({} as SubscriptionsProps);

        render(<Subscriptions {...props} />);

        expect(screen.getByRole("textbox")).toBeInTheDocument();
        expect(screen.getByRole("combobox")).toBeVisible();
        expect(screen.getByRole("textbox")).toBeDisabled();
        expect(screen.getByRole("combobox")).toBeDisabled();
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

    it("should call onSubmit", async () => {
        const user = UserEvent.setup();
        const mockOnSubscribe = jest.fn();
        const props = getProps({
            onSubscribe: mockOnSubscribe,
            isConnected: true,
        } as unknown as SubscriptionsProps);

        render(<Subscriptions {...props} />);
        expect(mockOnSubscribe).not.toHaveBeenCalled();

        await user.type(screen.getByRole("textbox"), "human");
        await user.click(screen.getByRole("button"));
        expect(screen.getByRole("button")).not.toBeDisabled();
        expect(mockOnSubscribe).toHaveBeenNthCalledWith(1, "human", 0);
    });

    it("should undisable all interactive elemnts when connectionStatus is success", () => {
        const props = getProps({
            isConnected: true,
        } as SubscriptionsProps);

        render(<Subscriptions {...props} />);

        expect(screen.getByRole("button")).not.toBeDisabled();
        expect(screen.getByRole("combobox")).not.toBeDisabled();
        expect(screen.getByRole("textbox")).not.toBeDisabled();
    });
});
