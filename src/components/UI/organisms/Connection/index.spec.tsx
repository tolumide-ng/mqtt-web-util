import React from "react";
import UserEvent from "@testing-library/user-event";
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
        expect(screen.getByRole("textbox", { name: "username" })).toBeEnabled();
        expect(screen.getByRole("textbox", { name: "hostname" })).toBeEnabled();
        expect(screen.getByRole("button")).toHaveTextContent("Connect");
        expect(
            screen.getByText(
                "You need to be connected in order to subscribe or publish messages",
            ),
        ).toBeVisible();
        expect(
            screen.queryByText(
                "Error connecting to broker, please confirm your credentials and try again",
            ),
        ).not.toBeInTheDocument();
    });

    it("should display Disconnect on the button when connectionStatus is success", () => {
        const props = getProps({ connectionStatus: Status.Success });

        render(<Connection {...props} />);
        expect(screen.getByRole("button")).toHaveTextContent("Disconnect");
    });

    it("should display the failure message is connectionStatus is Failure", () => {
        const props = getProps({ connectionStatus: Status.Failure });
        render(<Connection {...props} />);

        expect(
            screen.getByText(
                "Error connecting to broker, please confirm your credentials and try again",
            ),
        ).toBeInTheDocument();
    });

    it("should call when a user submits the form", async () => {
        const user = UserEvent.setup();
        const mockOnConnect = jest.fn();
        const props = getProps({
            connectionStatus: Status.Failure,
            onConnect: mockOnConnect,
        });
        const hostname = "hostNameA";
        const username = "usernameA";

        render(<Connection {...props} />);

        await user.type(
            screen.getByRole("textbox", { name: "hostname" }),
            hostname,
        );
        await user.type(
            screen.getByRole("textbox", { name: "username" }),
            username,
        );
        await user.click(screen.getByRole("button"));

        expect(mockOnConnect).toHaveBeenNthCalledWith(1, {
            hostname,
            username,
            password: "",
        });
    });
});
