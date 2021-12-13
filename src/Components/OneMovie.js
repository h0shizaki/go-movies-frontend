import React, { Component, Fragment } from 'react'

export default class OneMovie extends Component {

    state = {
        movie: {} ,
        isLoaded : false,
        error : null 
    };

    componentDidMount() {

        fetch("http://localhost:4000/v1/movie/" + this.props.match.params.id)
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
                movie: json.movie,
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
        const { movie, isLoaded , error} = this.state;

            if (movie.genres){
                movie.genres = Object.values(movie.genres);
            }else{
                movie.genres = [] ;                    
            }

            if(error) {
                return <div> Error: { error.message }</div>
            }
            else if (!isLoaded) {
                return (<p> Loading... </p>);
            } else {
                return (
                        <Fragment>
                            <h2>Movie: {this.state.movie.title} ({this.state.movie.year}) </h2>

                            <div className="float-start">
                                <small>Rating : { movie.mpaa_rating}  </small>
                                {movie.genres.map( (m,index) =>(
                                    <span className='badge bg-secondary me-1' key={index}>
                                        { m }
                                    </span>
                                ) ) }
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
                                        <td>{ movie.description}</td>
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