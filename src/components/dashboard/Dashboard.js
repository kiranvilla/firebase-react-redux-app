import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

import Notifications from './Notifications'
import ProjectList from '../projects/ProjectList';
import logo from '../../logo.svg';
import './dashboard.css'

class Dashboard extends Component {

    render() {
        // console.log(this.props.projects)
        const { projects, auth, users, userProfile, uid, profile } = this.props;
        if(auth.uid && profile.firstName === "") return <Redirect to={"/userProjects/" + uid} />
        if (!auth.uid) return <Redirect to="/signin" />
        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m6">
                        {
                            projects && userProfile ? (
                                <ProjectList projects={projects} users={users} uid={uid} userProfile={userProfile} />
                            ) : (
                                    <div>
                                        <img src={logo} className="App-logo" alt="logo" />
                                    </div>
                                )
                        }
                    </div>
                    <div className="col s12 m5 offset-m1">
                        <Notifications />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    // console.log(state.firebase.profile)
    return {
        projects: state.firestore.ordered.projects,
        auth: state.firebase.auth,
        userProfile: state.firestore.ordered.users,
        uid: state.firebase.auth.uid,
        profile: state.firebase.profile
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: "projects" },
        { collection: "users" }
    ])
)(Dashboard)

