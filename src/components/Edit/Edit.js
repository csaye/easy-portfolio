import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';

import ProjectEditList from '../ProjectEditList/ProjectEditList.js';

function Edit() {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');

  const [loading, setLoading] = useState(true);

  // get uid
  const uid = 'test-uid';

  async function getPortfolioData() {
    const doc = await firebase.firestore().collection('portfolios').doc(uid).get();
    const data = doc.data();
    // set parameters from data
    setTitle(data.title);
    setSubtitle(data.subtitle);
    // set loading false
    setLoading(false);
  }

  // get portfolio data on start
  useEffect(() => {
    getPortfolioData();
  }, []);

  async function publishPortfolio(e) {
    e.preventDefault();
    // update portfolio
    const uid = 'test-uid';
    await firebase.firestore().collection('portfolios').doc(uid).update({
      title: title,
      subtitle: subtitle,
    });
    // go to portfolio page
    window.location.href = "/";
  }

  // if loading portfolio data, wait
  if (loading) {
    return (
      <div className="Edit">
        <p>Loading portfolio...</p>
      </div>
    );
  }

  return (
    <div className="Edit">
      <form onSubmit={publishPortfolio}>
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
        <label htmlFor="subtitleInput">Subtitle</label>
        <input
        value={subtitle}
        type="text"
        id="subtitleInput"
        placeholder="Subtitle"
        onChange={e => setSubtitle(e.target.value)}
        />
        {/* Publish */}
        <button type="submit">Publish</button>
      </form>
      <hr />
      <ProjectEditList />
    </div>
  );
}

export default Edit;
