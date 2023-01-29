import { render, screen } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import { CreateMessage } from ".";

describe("Messages", () => {
    const getProps = ({
        isConnected = false,
        onPublishMessage = jest.fn(),
    }) => ({
        isConnected,
        onPublishMessage,
    });

    it("should render the component", () => {
        const props = getProps({});

        render(<CreateMessage {...props} />);

        expect(screen.getAllByRole("textbox")).toHaveLength(2);
        expect(screen.getByLabelText("topic")).toBeVisible();
        expect(screen.getByRole("combobox")).toBeVisible();
        expect(screen.getByRole("combobox")).toBeDisabled();
        expect(screen.getByRole("button")).toHaveTextContent("Publish Message");
        expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
        expect(screen.getByRole("textbox", { name: "message" })).toBeDisabled();
        expect(screen.getByRole("textbox", { name: "topic" })).toBeDisabled();
    });

    it("should call onPublishMessage when user fills the form and submits", async () => {
        const user = UserEvent.setup();
        const mockOnPublish = jest.fn();

        const props = getProps({
            isConnected: true,
            onPublishMessage: mockOnPublish,
        });

        const topic = "topicA";
        const message = "message to publish for all";

        render(<CreateMessage {...props} />);

        expect(mockOnPublish).not.toHaveBeenCalled();

        await user.type(screen.getByRole("textbox", { name: "topic" }), topic);
        await user.type(
            screen.getByRole("textbox", { name: "message" }),
            message,
        );
        await user.click(screen.getByRole("button"));

        expect(mockOnPublish).toHaveBeenNthCalledWith(1, {
            topic,
            message,
            qos: 0,
            messageId: null,
        });
    });

    it("should enable the input fields if isConnected is true", () => {
        const props = getProps({ isConnected: true });

        render(<CreateMessage {...props} />);

        expect(screen.getByRole("button")).toBeEnabled();
        expect(screen.getByRole("textbox", { name: "message" })).toBeEnabled();
        expect(screen.getByRole("textbox", { name: "topic" })).toBeEnabled();
        expect(screen.getByRole("combobox")).toBeEnabled();
    });
});
