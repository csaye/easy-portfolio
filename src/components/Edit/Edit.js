import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';

function Edit() {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [content, setContent] = useState('');

  const [loading, setLoading] = useState(true);

  async function getPortfolioData() {
    const uid = 'test-uid';
    const doc = await firebase.firestore().collection('portfolios').doc(uid).get();
    const data = doc.data();
    // set parameters from data
    setTitle(data.title);
    setSubtitle(data.subtitle);
    setContent(data.content);
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
      content: content
    });
  }

  // if loading, wait
  if (loading) {
    return (
      <div className="Edit">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="Edit">
      <p>Editing portfolio</p>
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
        {/* Content */}
        <label htmlFor="contentInput">Content</label>
        <input
        value={content}
        type="text"
        id="contentInput"
        placeholder="Content"
        onChange={e => setContent(e.target.value)}
        />
        {/* Publish */}
        <button type="submit">Publish</button>
      </form>
    </div>
  );
}

export default Edit;
