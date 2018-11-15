import React from 'react';
import { Link } from 'react-router-dom';

import ProjectSummary from './ProjectSummary'

const ProjectList = ({ projects, users, userProfile, uid }) => {
    const id = uid;
    const sigleUser = userProfile.find(user => {
        return user.id === id
    })
    return (
        <div className="project-list section">
            {
                projects && projects.map(project => {
                    return (
                        <Link to={"/project/" + project.id} key={project.id}><ProjectSummary project={project} /></Link>
                    )
                })
            }
            {/* {sigleUser.firstName ? (
                <div>
                    {sigleUser.firstName}
                </div>
            ): null} */}
        </div>
    )
}

export default ProjectList;