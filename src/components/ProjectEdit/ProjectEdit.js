import './ProjectEdit.css';
import firebase from 'firebase/app';
import { useState, useEffect } from 'react';

function ProjectEdit(props) {
  // get uid and project id
  const uid = 'test-uid';
  const id = props.data.id;

  const [title, setTitle] = useState(props.data.title);
  const [description, setDescription] = useState(props.data.description);
  const [image, setImage] = useState(undefined);
  const [url, setUrl] = useState(props.data.url);

  const [saved, setSaved] = useState(false);

  async function saveProject(e) {
    e.preventDefault();
    setSaved(false);
    // update storage with image
    if (image) {
      const storageRef = firebase.storage().ref(uid + '/' + id + '/image');
      await storageRef.put(image);
    }
    // update project
    const validUrl =
    (url.startsWith('http://') || url.startsWith('https://')) ?
    url : 'https://' + url;
    await firebase.firestore().collection('projects').doc(id).update({
      title: title,
      description: description,
      url: validUrl
    });
    setSaved(true);
  }

  const [imgUrl, setImgUrl] = useState('');
  async function getImgUrl() {
    // if image exists
    const listResult = await firebase.storage().ref(uid + '/' + id).listAll();
    if (listResult.items.length > 0) {
      // get image url
      const iUrl = await firebase.storage()
      .ref(uid + '/' + id + '/image').getDownloadURL();
      setImgUrl(iUrl);
    }
  }

  // get image url on start
  useEffect(() => {
    getImgUrl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function deleteProject() {
    // if image exists
    const listResult = await firebase.storage().ref(uid + '/' + id).listAll();
    if (listResult.items.length > 0) {
      // delete image
      await firebase.storage().ref(uid + '/' + id + '/image').delete();
    }
    // delete project
    await firebase.firestore().collection('projects').doc(id).delete();
  }

  return (
    <div className="ProjectEdit">
      <form onSubmit={saveProject}>
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
        type="text"
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
        {
          image ? <img src={URL.createObjectURL(image)} alt="" /> :
          <img src={imgUrl} alt="" />
        }
        {/* Save */}
        <button type="submit">Save Project</button>
        {/* Save text */}
        { saved && <p className="text-success">Project saved successfully</p> }
      </form>
      {/* Delete */}
      <button onClick={deleteProject}>Delete</button>
    </div>
  );
}

export default ProjectEdit;
