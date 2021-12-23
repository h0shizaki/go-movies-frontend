import React, { Component } from 'react';
import { Fragment } from 'react/cjs/react.production.min';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default class Admin extends Component {

    state = {
        movies: [],
        isLoaded: false,
        error: null
    };

    componentDidMount() {

        if(this.props.jwt === "") {
            this.props.history.push({
                pathname: "/login"
            })
            return ;
        }


        fetch("http://localhost:4000/v1/movies")
            .then(res => {
                if (res.status !== '200') {
                    let err = Error;
                    err.message = 'Invalid response code: ' + res.status;
                    this.setState({ error: err });
                }
                return res.json();
            })
            .then(json => {
                this.setState({
                    movies: json.movies,
                    isLoaded: true
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
        const { movies, isLoaded, error } = this.state;

        if (error) {
            return <div> Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div> ;
        }
        else {
            return (
                <Fragment>
                    <h2>Manage Movie Catalogue </h2>
                    <div className='list-group'>
                        {movies.map( (m)=>(
                            <Link to={`/admin/movie/${m.id}` } key={m.id}  className='list-group-item list-group-item-action' > {m.title} </Link>
                        ))}
                    </div>
                </Fragment>

            );
        }
    }
}