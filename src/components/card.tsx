import { Component } from "react";
import type { CardProps } from "./types/interfaces";


class Card extends Component<CardProps> {
    render() {
        return(
            <div>
                <div>итем {this.props.name}</div>
                <div>описание {this.props.description}</div>
            </div>
        );
    }
}

export default Card;