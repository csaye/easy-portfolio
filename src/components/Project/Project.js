import firebase from 'firebase/app';
import React, { useState, useEffect } from 'react';

function Project(props) {
  // get project data from props
  const { id, uid, title, description } = props.data;

  // get image url
  const [imgUrl, setImgUrl] = useState(undefined);
  const [loading, setLoading] = useState(true);
  async function getImgUrl() {
    const storageRef = firebase.storage().ref(uid + '/' + id);
    await storageRef.getDownloadURL()
    .then(url => setImgUrl(url))
    .catch(e => console.log('No image found to show. This is fine.'));
    // stop loading
    setLoading(false);
  }

  // get image url on start
  useEffect(() => {
    getImgUrl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // if loading, wait
  if (loading) {
    return (
      <div className="Project">
        <p>Loading project...</p>
      </div>
    )
  }

  return (
    <div className="Project">
      <hr />
      <h2>{title}</h2>
      <p>{description}</p>
      <img src={imgUrl} alt={title}/>
    </div>
  );
}

export default Project;
