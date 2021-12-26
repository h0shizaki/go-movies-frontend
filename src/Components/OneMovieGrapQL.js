import React, { Component, Fragment } from 'react'

export default class OneMovieGraphQL extends Component {

    state = {
        movie: {},
        isLoaded: false,
        error: null
    };

    componentDidMount() {
        const payload = `
        {
            movie(id : ${this.props.match.params.id}) {
                id
                title
                runtime
                year
                description
                release_date
                rating
                mpaa_rating
            }
        }
        `

        const myHeaders = new Headers();
        myHeaders.append('Content-Type', "application/json");

        const requestOption = {
            method: "POST",
            body: payload,
            headers: myHeaders

        }

        fetch('http://localhost:4000/v1/graphql', requestOption)
            .then(res => res.json())
            .then((data) => {

                this.setState({
                    movie: data.data.movie ,
                    isLoaded : true
                })
            });
    }

    render() {
        const { movie, isLoaded, error } = this.state;

        if (movie.genres) {
            movie.genres = Object.values(movie.genres);
        } else {
            movie.genres = [];
        }

        if (error) {
            return <div> Error: {error.message}</div>
        }
        else if (!isLoaded) {
            return (<p> Loading... </p>);
        } else {
            return (
                <Fragment>
                    <h2>Movie: {this.state.movie.title} ({this.state.movie.year}) </h2>

                    <div className="float-start">
                        <small>Rating : {movie.mpaa_rating}  </small>
                        {movie.genres.map((m, index) => (
                            <span className='badge bg-secondary me-1' key={index}>
                                {m}
                            </span>
                        ))}
                    </div>
                    <div className='clearfix'></div>
                    <hr />
                    <table className="table table-compact table-striped">
                        <thead> </thead>
                        <tbody>
                            <tr>
                                <td><strong>Title</strong></td>
                                <td>{movie.title}</td>
                            </tr>

                            <tr>
                                <td><strong>Description : </strong></td>
                                <td>{movie.description}</td>
                            </tr>

                            <tr>
                                <td><strong>Run time</strong></td>
                                <td>{movie.runtime} minutes</td>
                            </tr>

                        </tbody>
                    </table>

                </Fragment>
            );
        }
    }
}