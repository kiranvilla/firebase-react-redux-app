import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';

import { signIn } from '../../store/actions/authActions';

class SignIn extends Component {
    state= {
        email: '',
        password: ''
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // console.log(this.state);
        this.props.signIn(this.state);
        // this.setState({
        //     email: "",
        //     password: ""
        // })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    render() {
        const { authError, auth } = this.props;
        if (auth.uid) return <Redirect to="/" />

        return (
            <div className="container">
                <form className="white" onSubmit={this.handleSubmit}>
                    <h5 className="grey-text text-darken-3">Sign In</h5>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={this.handleChange} value={this.state.email}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={this.handleChange} value={this.state.password}/>
                    </div>
                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0">Login</button>
                        <div className="red-text center">
                            {
                                authError ? <p>{authError}</p> : null
                            }
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        authError: store.auth.authError,
        auth: store.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
