import React, { Component } from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase';

import { editProject } from '../../store/actions/projectActions';

class userProjects extends Component {
    state = {
        edit: false,
        title: "",
        content: "",
        id: "",
    }

    handleEdit = (id) => (e) => {

        this.setState({
            edit: true,
            id: id
        })
    }

    handleChange = (ids) => (e) => {
        // const val = this.props.userProjects ? this.props.userProjects.find((proj, k) => {
        //     return proj.id === ids
        // }) : null
        // console.log("val", ids, val)
        // val.title = e.target.value;
        // val.content = e.target.value;
        this.setState({
            [e.target.id]: e.target.value,
            id: ids,
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // console.log(this.state)
        this.props.edited(this.state)
        this.setState({
            edit: false
        })
    }

    handleCancel = (e) => {
        this.setState({
            edit: false
        }) 
    }

    render() {
        const userId = this.props.match.params.id;
        const userProjects = this.props.userProjects ? this.props.userProjects.filter(i => i.authorId === userId) : null
        // console.log(userProjects);

        if (this.props.userProjects) {
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
                                        <button onClick={this.handleEdit(project.id)}>Edit</button>
                                    </div>
                                    {
                                        this.state.edit && this.state.id === project.id ? (
                                            <div>
                                                <form onSubmit={this.handleSubmit}>
                                                    <input type="text" placeholder="Title" id="title" onChange={this.handleChange(project.id)} />
                                                    <input type="text" placeholder="Content" id="content" onChange={this.handleChange(project.id)} />
                                                    <button>Submit</button><button onClick={this.handleCancel}>Cancel</button>
                                                </form>
                                            </div>
                                        ) : null
                                    }
                                </div>
                            )
                        }) : (
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


}

const mapStateToProps = (state) => {
    return {
        userProjects: state.firestore.ordered.projects
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        edited: (val) => dispatch(editProject(val))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: "projects" }
    ])
)(userProjects)
