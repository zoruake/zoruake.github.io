import React from "react";

class Welcome extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            message : 'Olá Mundo!!',
        }
    }

    render() {
        return <h1>{this.props.text}</h1>
    }
}

export default Welcome