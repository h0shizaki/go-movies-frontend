import React , {Component} from 'react';

export default class Catagories extends Component {

    render() {
        return (<h2> Category: {this.props.title} </h2>);
    }
}