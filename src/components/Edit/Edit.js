import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';

import ProjectEditList from '../ProjectEditList/ProjectEditList.js';

function Edit() {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [bgColor, setBgColor] = useState('');
  const [textColor, setTextColor] = useState('');

  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  // get uid
  const uid = 'test-uid';

  async function getPortfolioData() {
    const doc = await firebase.firestore().collection('portfolios').doc(uid).get();
    const data = doc.data();
    // set parameters from data
    setTitle(data.title);
    setSubtitle(data.subtitle);
    setBgColor(data.bgColor);
    setTextColor(data.textColor);
    // set loading false
    setLoading(false);
  }

  // get portfolio data on start
  useEffect(() => {
    getPortfolioData();
  }, []);

  async function savePortfolio(e) {
    e.preventDefault();
    setSaved(false);
    // update portfolio
    const uid = 'test-uid';
    await firebase.firestore().collection('portfolios').doc(uid).update({
      title: title,
      subtitle: subtitle,
      bgColor: bgColor,
      textColor: textColor
    });
    setSaved(true);
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
      <form onSubmit={savePortfolio}>
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
        {/* Background color */}
        <label htmlFor="bgColorInput">Background Color</label>
        <input
        value={bgColor}
        type="color"
        id="bgColorInput"
        onChange={e => setBgColor(e.target.value)}
        />
        {/* Text color */}
        <label htmlFor="textColorInput">Text Color</label>
        <input
        value={textColor}
        type="color"
        id="textColorInput"
        onChange={e => setTextColor(e.target.value)}
        />
        {/* Save */}
        <button type="submit">Save</button>
        {/* Save text */}
        { saved && <p className="text-success">Portfolio saved successfully</p> }
      </form>
      <hr />
      <ProjectEditList />
    </div>
  );
}

export default Edit;
