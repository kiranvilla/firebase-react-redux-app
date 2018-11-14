import React from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase';

const userProjects = (props) => {

    const userId = props.match.params.id;
    const userProjects = props.userProjects ? props.userProjects.filter(i => i.authorId === userId) : null
    console.log(userProjects)

    if (props.userProjects) {
        return (
            <div>
                <h4>Your Projects</h4>
                {   
                    userProjects.length !== 0 ? userProjects.map(project => {
                        return (
                            <div key={project.id} className="card z-depth-0 project-summary">
                                <div className="card-content grey-text text-darken-3 ">
                                    <span className="card-title">{project.title}</span>
                                    <p>{project.content}</p>
                                    <p>{project.authorFirstName} {project.authorLastName}</p>
                                    <p className="grey-text">10th, November 7pm</p>
                                </div>
                            </div>
                        )
                    }):(
                        <div>No Projects</div>
                    )
                }
            </div>
        )
    } else {
        return (
            <div>
                <h1>Loading</h1>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userProjects: state.firestore.ordered.projects
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: "projects" }
    ])
)(userProjects)