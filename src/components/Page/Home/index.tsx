import * as React from "react";
import { Status } from "../../../types";
import { Connection } from "../../UI/organisms/Connection";

export const HomePage = () => {
    return (
        <div className="">
            <Connection
                onConnect={() => {}}
                connectionStatus={Status.Success}
            />
        </div>
    );
};
