import React from "react";
import UserEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { TextArea } from ".";

describe("TextArea", () => {
    const getProps = ({ onChange = jest.fn(), disabled = false }) => ({
        name: "messasge",
        placeholder: "Send this to queuee",
        onChange,
        value: "value of the comment",
        disabled,
    });

    it("should render the component", () => {
        const props = getProps({});

        render(<TextArea {...props} />);

        expect(
            screen.getByPlaceholderText("Send this to queuee"),
        ).toBeVisible();
        expect(screen.getByRole("textbox")).toHaveTextContent(
            "value of the comment",
        );
        expect(screen.getByRole("textbox")).not.toBeDisabled();
    });

    it("should call the onChange handler when a user types", async () => {
        const mockOnChange = jest.fn();
        const user = UserEvent.setup();
        const props = getProps({ onChange: mockOnChange });
        const text = "new text to display";

        render(<TextArea {...props} />);
        expect(mockOnChange).not.toHaveBeenCalled();
        await user.type(screen.getByRole("textbox"), text);
        expect(mockOnChange).toHaveBeenCalledTimes(text.length);
    });

    it("should not call the onChange handler if the textarea is disabled", async () => {
        const mockOnChange = jest.fn();
        const user = UserEvent.setup();
        const props = getProps({ onChange: mockOnChange, disabled: true });
        const text = "new text to display";

        render(<TextArea {...props} />);
        expect(mockOnChange).not.toHaveBeenCalled();
        await user.type(screen.getByRole("textbox"), text);
        expect(mockOnChange).not.toHaveBeenCalled();
    });
});
