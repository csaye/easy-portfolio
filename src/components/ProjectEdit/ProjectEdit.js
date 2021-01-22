import firebase from 'firebase/app';
import { useState } from 'react';

function ProjectEdit(props) {
  const id = props.data.id;

  const [title, setTitle] = useState(props.data.title);
  const [description, setDescription] = useState(props.data.description);

  async function updateProject(e) {
    e.preventDefault();
    // update project
    await firebase.firestore().collection('projects').doc(id).update({
      title: title,
      description: description
    });
  }

  async function deleteProject() {
    // delete project
    await firebase.firestore().collection('projects').doc(id).delete();
  }

  return (
    <div className="ProjectEdit">
      <form onSubmit={updateProject}>
        {/* Title */}
        <label htmlFor="titleInput">Title</label>
        <input
        value={title}
        type="text"
        id="titleInput"
        placeholder="Title"
        onChange={e => setTitle(e.target.value)}
        />
        {/* Subtitle */}
        <label htmlFor="descriptionInput">Description</label>
        <input
        value={description}
        type="text"
        id="descriptionInput"
        placeholder="Description"
        onChange={e => setDescription(e.target.value)}
        />
        {/* Publish */}
        <button type="submit">Publish</button>
      </form>
      {/* Delete */}
      <button onClick={deleteProject}>Delete</button>
    </div>
  );
}

export default ProjectEdit;
