import React, { Component, Fragment } from "react";
import { Link } from 'react-router-dom' ;

export default class Movies extends Component {

    state = { movies: [] };

    componentDidMount() {
        this.setState({
            movies: [
                { id: 1, title: "Shang-Shi", runtime: 174 },
                { id: 2, title: "Shangri-La", runtime: 123 },
                { id: 3, title: "Shaman-King", runtime: 153 }
            ]
        })

    }

    render() {
        return (
            <Fragment>
                <h2> Choose a movies</h2>
                <ul>
                    {this.state.movies.map((m) => (
                        <li key={m.id}>
                            <Link to={`movies/${m.id}`}>{m.title} </Link>
                        </li>
                    ))}
                </ul>
            </Fragment>
        );
    }

}