import { Component } from "react";
import Card from './card';
import type { ListProps } from "./types/interfaces";

class CardList extends Component<ListProps> {

    render() {
        return (
            <ul>
                {this.props.data.map(card => {
                    const urlParts = card.url.split("/");
                    const id = urlParts[urlParts.length - 2];

                    return (
                    <li key={id}>
                        <Card name={card.name} description={card.url}/>
                    </li>
                    )
            })}
            </ul>
        )
    }
}

export default CardList;