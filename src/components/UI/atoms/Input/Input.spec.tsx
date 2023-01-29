import * as React from "react";
import UserEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { Input } from "./Input";

describe("Input Component", () => {
    const getProps = ({
        onChange = jest.fn(),
        required = false,
        disabled = false,
    }) => ({
        onChange,
        name: "hostname",
        required,
        value: "mqtt.client",
        inputType: "text",
        disabled,
    });

    it("should render the input component", () => {
        const props = getProps({});

        render(<Input {...props} />);

        expect(screen.getByRole("textbox")).toBeInTheDocument();
        expect(screen.getByRole("textbox")).not.toBeRequired();
        expect(screen.getByLabelText(props.name)).toBeInTheDocument();
    });

    it("should call onChange when a user types", async () => {
        const mockOnChange = jest.fn();
        const props = getProps({ onChange: mockOnChange });
        const user = UserEvent.setup();

        render(<Input {...props} />);
        expect(mockOnChange).not.toHaveBeenCalled();
        await user.type(screen.getByRole("textbox"), "name@example.com");
        expect(mockOnChange).toHaveBeenCalled();
    });

    it("should not call onChange if disabled is true", async () => {
        const mockOnChange = jest.fn();
        const props = getProps({ onChange: mockOnChange, disabled: true });
        const user = UserEvent.setup();

        render(<Input {...props} />);
        expect(mockOnChange).not.toHaveBeenCalled();
        await user.type(screen.getByRole("textbox"), "name@example.com");
        expect(mockOnChange).not.toHaveBeenCalled();
    });
});
