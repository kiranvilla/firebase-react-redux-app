import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom';

const ProjectDetails = (props) => {
    const { projectDetails, auth } = props

    if (!auth.uid) return <Redirect to="/signin" />
    
    if (projectDetails) {
        return (
            <div className="container section project-details">
                <div className="card z-depth-0">
                    <div className="card-cntent">
                        <span className="card-title">{projectDetails.title}</span>
                        <p>{projectDetails.content}</p>
                    </div>
                    <div className="grey-text">
                        <div>Psted by {projectDetails.authorFirstName} {projectDetails.authorLastName}</div>
                        <div>10th November, 2AM</div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="container center">
                <p>Loading Project...</p>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    // console.log(state);
    const id = ownProps.match.params.id;
    const projects = state.firestore.data.projects;
    const project = projects ? projects[id] : null
    return {
        projectDetails: project,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: "projects" }
    ])
)(ProjectDetails)
