import React, { Component } from 'react'
import { Fragment } from 'react/cjs/react.production.min';
import { Link } from 'react-router-dom'

export default class Genre extends Component {

    state = {
        genres: [],
        isLoaded: false,
        error: null
    }

    componentDidMount() {
        fetch("http://localhost:4000/v1/genres")
            // .then(res => res.json())
            .then((res) => {
                console.log("Status code is " + res.status);
                if (res.status !== '200') {
                    let err = Error;
                    err.message = "Invalid response code: " + res.status;
                    this.setState({ error: err })
                }
                return res.json();
            })
            .then((json) => {
                this.setState({
                    genres: json.genres,
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
        const { genres, isLoaded, error } = this.state;
        if (error) {
            return <div> Error: {error.message}</div>
        }
        else if (!isLoaded) {
            return (<p> Loading... </p>);

        } else {

            return (
                <Fragment>

                    <h2>
                        Genres
                    </h2>

                    <div className='list-group'>
                        {genres.map((m) => (
                            <Link to={{
                                pathname: `/genre/${m.id}`,
                                genreName: m.genre_name
                            }} className='list-group-item list-group-item-action' key={m} >{m.genre_name}</Link>
                        ))}
                    </div>


                </Fragment>
            );
        }
    }
}