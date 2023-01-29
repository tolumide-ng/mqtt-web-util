import { render, screen } from "@testing-library/react";
import { CreateMessage } from ".";
import { Status } from "../../../../types";

describe("Messages", () => {
    const getProps = ({
        connectionStatus = Status.Rest,
        onPublishMessage = jest.fn(),
    }) => ({
        connectionStatus,
        onPublishMessage,
    });

    it("should render the component", () => {
        const props = getProps({});

        render(<CreateMessage {...props} />);

        expect(screen.getAllByRole("textbox")).toHaveLength(2);
        expect(screen.getByLabelText("topic")).toBeVisible();
        expect(screen.getByRole("combobox")).toBeVisible();
        expect(screen.getByRole("button")).toHaveTextContent("Publish Message");
        expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
    });
});
