import firebase from 'firebase/app';
import { useState } from 'react';

function ProjectEdit(props) {
  // get uid and project id
  const uid = 'test-uid';
  const id = props.data.id;

  const [title, setTitle] = useState(props.data.title);
  const [description, setDescription] = useState(props.data.description);
  const [image, setImage] = useState(props.data.image);
  const [url, setUrl] = useState(props.data.url);

  async function updateProject(e) {
    e.preventDefault();
    // update storage with image
    if (image) {
      const storageRef = firebase.storage().ref(uid + '/' + id);
      await storageRef.put(image);
    }
    // update project
    await firebase.firestore().collection('projects').doc(id).update({
      title: title,
      description: description,
      url: url
    });
  }

  async function deleteProject() {
    // delete image
    await firebase.storage().ref(uid + '/' + id).delete()
    .catch(e => console.log('No image found to delete. This is fine.'));
    // delete project
    await firebase.firestore().collection('projects').doc(id).delete();
  }

  return (
    <div className="ProjectEdit">
      <form onSubmit={updateProject}>
        {/* Title */}
        <label htmlFor={`titleInput-${id}`}>Title</label>
        <input
        value={title}
        type="text"
        id={`titleInput-${id}`}
        placeholder="Title"
        onChange={e => setTitle(e.target.value)}
        />
        {/* Subtitle */}
        <label htmlFor={`descriptionInput-${id}`}>Description</label>
        <input
        value={description}
        type="text"
        id={`descriptionInput-${id}`}
        placeholder="Description"
        onChange={e => setDescription(e.target.value)}
        />
        {/* URL */}
        <label htmlFor={`urlInput-${id}`}>URL</label>
        <input
        value={url}
        type="url"
        id={`urlInput-${id}`}
        placeholder="Project URL"
        onChange={e => setUrl(e.target.value)}
        />
        {/* Image */}
        <label htmlFor={`imageInput-${id}`}>Image</label>
        <input
        type="file"
        id={`imageInput-${id}`}
        accept="image/*"
        className="file-input"
        onChange={e => setImage(e.target.files[0])}
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
