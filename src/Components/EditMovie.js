import React, { Component, Fragment } from 'react'
import './EditMovie.css';
import Input from './form-component/Input';
import Textarea from './form-component/Textarea';
import Select from './form-component/Select';
import Alert from './ui-components/Alert';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default class EditMovie extends Component {

    constructor(props) {
        super(props);

        this.state = {
            movie: {
                id: 0,
                title: '',
                release_date: '',
                runtime: '',
                mpaa_rating: '',
                rating: '',
                description: ''
            },
            isLoaded: false,
            error: null,
            mpaaOptions: [
                { id: "G", value: "G" },
                { id: "PG", value: "PG" },
                { id: "PG13", value: "PG13" },
                { id: "R", value: "R" },
                { id: "NC17", value: "NC17" }

            ],
            errors: [],
            alert: {
                type: "d-none",
                message: ""
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (evt) => {
        evt.preventDefault();

        //clientside validation

        let errors = [];
        if (this.state.movie.title === "") errors.push("title");
        if (this.state.movie.release_date === "") errors.push("release_date");
        if (this.state.movie.runtime === "") errors.push("runtime");
        if (this.state.movie.mpaa_rating === "") errors.push("mpaa_rating");
        if (this.state.movie.rating === "") errors.push("rating");
        if (this.state.movie.description === "") errors.push("description");

        this.setState({ errors: errors });

        if (errors.length > 0) {
            return false;
        }


        const data = new FormData(evt.target);
        const payload = Object.fromEntries(data.entries());
        console.log(payload);

        const requestOptions = {
            method: "POST",
            body: JSON.stringify(payload)
        }

        fetch('http://localhost:4000/v1/admin/editmovie', requestOptions)
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    this.setState({
                        alert: {
                            type: 'alert-danger',
                            message: data.error.message
                        }
                    })
                } else {
                    this.props.history.push({
                        pathname: "/admin"
                    })
                }
            })
    }

    handleChange = (evt) => {
        let value = evt.target.value;
        let name = evt.target.name;

        this.setState((preState) => ({
            movie: {
                ...preState.movie,
                [name]: value
            }
        }))
    }

    hasError(key) {
        return this.state.errors.indexOf(key) !== -1;
    }


    componentDidMount() {
        const id = this.props.match.params.id;
        if (id > 0) {
            fetch("http://localhost:4000/v1/movie/" + id)
                .then(res => {
                    if (res.status !== "200") {
                        let err = Error;
                        err.Message = "Invalid response code: " + res.status;
                        this.setState({ error: err })
                    }
                    return res.json();
                })
                .then((json) => {
                    if(json.movie){

                        const releaseDate = new Date(json.movie.release_date)
    
                        this.setState({
                            movie: {
                                id: id,
                                title: json.movie.title,
                                release_date: releaseDate.toISOString().split("T")[0],
                                runtime: json.movie.runtime,
                                mpaa_rating: json.movie.mpaa_rating,
                                rating: json.movie.rating,
                                description: json.movie.description
                            },
                            isLoaded: true
    
                        },
                            (error) => {
                                this.setState({
                                    isLoaded: true,
                                    error
                                })
                            }
    
                        )
                    }else {
                        let err = Error ;
                        err.message = "Movie not found"
                        this.setState({
                            isLoaded: true,
                            error : err  
                        })
                    }
                })
        } else {
            this.setState({ isLoaded: true })
        }
    }

    confirmDelete = (e) => {
        // console.log("Would delte movie id", this.state.movie.id)

        confirmAlert({
            title: 'Confirm to delete Movie?',
            message: 'Are you sure?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        fetch("http://localhost:4000/v1/admin/deletemovie/" + this.state.movie.id , {method: "GET"})
                        .then(response => response.json())
                        .then(data =>{
                            if(data.error){
                                this.setState({
                                    alert: {type : "alert-danger" , message: data.error.message}
                                })
                            }
                            else{
                                this.props.history.push({
                                    pathname: "/admin"
                                })
                            }
                        })
                    }
                },
                {
                    label: 'No',
                    onClick: () => {}
                }
            ]
        });
    }

    render() {
        let { movie, isLoaded, error } = this.state;

        if (error) {
            return (<div>Error: {error.message}</div>);
        } else if (!isLoaded) {
            return (<div>Loading...</div>);
        } else {


            return (
                <Fragment>
                    <h2>Add/Edit Movie</h2><br />
                    <Alert
                        alertType={this.state.alert.type}
                        alertMessage={this.state.alert.message}
                    />
                    <hr />
                    <form onSubmit={this.handleSubmit}>
                        <input type='hidden' name="id" id="id" value={movie.id} onChange={this.handleChange} />

                        <Input
                            title={'Title'}
                            type={'text'}
                            name={'title'}
                            value={movie.title}
                            handleChange={this.handleChange}

                            className={this.hasError("title") ? "is-invalid" : ""}
                            errorDiv={this.hasError("title") ? "text-danger" : "d-none"}
                            errorMessage={"Please enter title"}

                        />

                        <Input
                            title={'Release Date'}
                            type={'date'}
                            name={'release_date'}
                            value={movie.release_date}
                            handleChange={this.handleChange}

                            className={this.hasError("release_date") ? "is-invalid" : ""}
                            errorDiv={this.hasError("release_date") ? "text-danger" : "d-none"}
                            errorMessage={"Please enter release date"}

                        />

                        <Input
                            title={'Runtime'}
                            type={'text'}
                            name={'runtime'}
                            value={movie.runtime}
                            handleChange={this.handleChange}

                            className={this.hasError("runtime") ? "is-invalid" : ""}
                            errorDiv={this.hasError("runtime") ? "text-danger" : "d-none"}
                            errorMessage={"Please enter runtime"}

                        />

                        <Select
                            title={'MPAA Rating'}
                            name={'mpaa_rating'}
                            options={this.state.mpaaOptions}
                            value={movie.mpaa_rating}
                            handleChange={this.handleChange}
                            placeholder={'Choose...'}

                            className={this.hasError("mpaa_rating") ? "is-invalid" : ""}
                            errorDiv={this.hasError("mpaa_rating") ? "text-danger" : "d-none"}
                            errorMessage={"Please select MPAA rating"}
                        />

                        <Input
                            title={'Rating'}
                            type={'text'}
                            name={'rating'}
                            value={movie.rating}
                            handleChange={this.handleChange}

                            className={this.hasError("rating") ? "is-invalid" : ""}
                            errorDiv={this.hasError("rating") ? "text-danger" : "d-none"}
                            errorMessage={"Please enter rating"}

                        />

                        <Textarea
                            title={'Description'}
                            name={'description'}
                            value={movie.description}
                            rows={'3'}
                            handleChange={this.handleChange}

                            className={this.hasError("description") ? "is-invalid" : ""}
                            errorDiv={this.hasError("description") ? "text-danger" : "d-none"}
                            errorMessage={"Please enter description"}
                        />

                        <hr />

                        <button className='btn btn-primary'>Save</button>
                        <Link to="/admin" className="btn btn-warning ms-1">
                            Cancel
                        </Link>
                        {movie.id > 0 && (
                            <a href='#!' onClick={() => this.confirmDelete()}
                                className='btn btn-danger ms-1'>
                                Delete
                            </a>
                        )}
                    </form>

                </Fragment>)
        }
    }
}