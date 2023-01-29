import * as React from "react";
import { render, screen } from "@testing-library/react";
import { SubscribeRow } from "./SubscribeRow";

describe("SubscribeRow", () => {
    it("should render the component", () => {
        render(<SubscribeRow name="humans and bots" />);

        expect(screen.getByText("humans and bots")).toBeVisible();
        expect(screen.getByText("✓")).toBeInTheDocument();
    });
});
