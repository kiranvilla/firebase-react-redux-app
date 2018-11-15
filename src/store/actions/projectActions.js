export const createProject = (project) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // async code
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        firestore.collection('projects').add({
            ...project,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId,
            createdAt: new Date()
        }).then(() => {
            dispatch({ type: "CREATE_PROJECT", project: project })
        }).catch((err) => {
            dispatch({ type: "CREATE_PROJECT_ERROR", err })
        })

    }
}

export const editProject = (pro) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // async code
        const firestore = getFirestore();
        firestore.collection('projects').doc(pro.id).update({
            title: pro.title,
            content: pro.content
        }).then(() => {
            dispatch({ type: "EDIT_PROJECT", project: pro })
        }).catch(err => {
            dispatch({ type: "EDIT_PROJECT_ERROR", err })
        })

    }
}
