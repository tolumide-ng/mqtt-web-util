import React from "react";
import UserEvent from "@testing-library/user-event";
import { SelectOption } from "./SelectOption";
import { render, screen } from "@testing-library/react";

describe("SelectOption", () => {
    const getProps = ({ onChange = jest.fn() }) => ({
        onChange,
        options: [1, 2, 3],
        value: 2,
        name: "qos",
    });

    it("should render the component", () => {
        const props = getProps({});

        render(<SelectOption {...props} />);

        expect(screen.getByRole("combobox")).toBeInTheDocument();
        expect(screen.getByLabelText(props.name)).toBeInTheDocument();
    });

    it("should call the onChange handler when an option is selected", async () => {
        const mockOnChange = jest.fn();
        const props = getProps({ onChange: mockOnChange });
        const user = UserEvent.setup();

        render(<SelectOption {...props} />);
        expect(mockOnChange).not.toHaveBeenCalled();

        await user.selectOptions(
            screen.getByRole("combobox"),
            screen.getByRole("option", { name: "Quality of Service = 2" }),
        );
        expect(mockOnChange).toHaveBeenCalledTimes(1);
    });
});
