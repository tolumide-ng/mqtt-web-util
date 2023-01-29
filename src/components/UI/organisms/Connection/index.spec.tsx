import React from "react";
import { render, screen } from "@testing-library/react";
import { Status } from "../../../../types";
import { Connection } from ".";

describe("Connection", () => {
    const getProps = ({
        onConnect = jest.fn(),
        connectionStatus = Status.Rest,
    }) => ({
        onConnect,
        connectionStatus,
    });

    it("should render the component", () => {
        const props = getProps({});

        render(<Connection {...props} />);
        expect(screen.getAllByRole("textbox")).toHaveLength(2);
        expect(screen.getByLabelText("hostname")).toBeInTheDocument();
        expect(screen.getByLabelText("password")).toBeInTheDocument();
        expect(screen.getByLabelText("username")).toBeInTheDocument();
        expect(screen.getByRole("button")).toHaveTextContent("Connect");
    });

    it("should display Disconnect on the button when connectionStatus is success", () => {
        const props = getProps({ connectionStatus: Status.Success });

        render(<Connection {...props} />);
        expect(screen.getByRole("button")).toHaveTextContent("Disconnect");
    });
});
