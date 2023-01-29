import * as React from "react";
import UserEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { Button, ButtonType } from "./Button";

describe("Button", () => {
    const getProps = ({ onClick = jest.fn(), disabled = false }) => ({
        text: "Click me",
        type: "button" as ButtonType,
        onClick,
        disabled,
    });

    it("should render the component", () => {
        const props = getProps({});

        render(<Button {...props} />);

        expect(screen.getByRole("button")).toHaveTextContent(props.text);
        expect(screen.getByRole("button")).not.toBeDisabled();
    });

    it("should call onClick handler if the user clicks the button", async () => {
        const mockOnClick = jest.fn();
        const props = getProps({ onClick: mockOnClick });
        const user = UserEvent.setup();

        render(<Button {...props} />);

        expect(mockOnClick).not.toHaveBeenCalled();
        await user.click(screen.getByRole("button"));
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it("should not call the onClick handler if the user clicks a disabled button", async () => {
        const mockOnClick = jest.fn();
        const props = getProps({ onClick: mockOnClick, disabled: true });
        const user = UserEvent.setup();

        render(<Button {...props} />);

        expect(mockOnClick).not.toHaveBeenCalled();
        await user.click(screen.getByRole("button"));
        expect(mockOnClick).not.toHaveBeenCalled();
    });
});
