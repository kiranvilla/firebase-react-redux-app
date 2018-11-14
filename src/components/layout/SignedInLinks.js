import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { signOut } from '../../store/actions/authActions';

const SignedInLinks = (props) => {

    const { initial } = props;
    const uid = props.uid;

    return (
        <ul className="right">
            <li><NavLink to="/create">New Project</NavLink></li>
            <li><a onClick={props.signOut}>Log Out</a></li>
            <li><NavLink to={"/userProjects/" + uid} className="btn btn-floating pink lighten-1">{initial}</NavLink></li>
        </ul>
    )
}

const mapStateToProps = (state) => {
    return {
        initial: state.firebase.profile.initials,
        uid: state.firebase.auth.uid
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignedInLinks);