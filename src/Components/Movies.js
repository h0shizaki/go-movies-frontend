import React, { Component, Fragment } from "react";
import { Link } from 'react-router-dom';

export default class Movies extends Component {

    state = {
        movies: [],
        isLoaded: false,
        error: null
    };

    componentDidMount() {
        fetch("http://localhost:4000/v1/movies")
            // .then(res => res.json())
            .then( (res)=>{
                console.log("Status code is " + res.status);
                if(res.status !== '200'){
                    let err = Error;
                    err.message = "Invalid response code: "+res.status;
                    this.setState({error: err})
                }
                return res.json();
            })
            .then((json) => {
                this.setState({
                    movies: json.movies,
                    isLoaded: true,
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
                )
            })

    }

    render() {
        const { movies, isLoaded , error } = this.state;
        if(error) {
            return <div> Error: { error.message }</div>
        }
        else if (!isLoaded) {
            return (<p> Loading... </p>);
        } else {

            return (
                <Fragment>
                    <h2> Choose a movies</h2>
                    <ul>
                        {movies.map((m) => (
                            <li key={m.id}>
                                <Link to={`movies/${m.id}`}>{m.title} </Link>
                            </li>
                        ))}
                    </ul>
                </Fragment>
            );
        }
    }

}