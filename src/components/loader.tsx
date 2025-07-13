import { Component, type ReactNode } from "react";

class Loader extends Component {
    render(): ReactNode {
        return (
            <div>
                <span>Loading...</span>
            </div>
        );
    }
}

export default Loader;