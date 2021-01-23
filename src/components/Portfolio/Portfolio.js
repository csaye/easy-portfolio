import './Portfolio.css';
import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import ProjectList from '../ProjectList/ProjectList.js';

function Portfolio() {
  const [data, setData] = useState(undefined);

  // get uid
  const uid = 'test-uid';

  async function getPortfolioData() {
    const uid = 'test-uid';
    const doc = await firebase.firestore().collection('portfolios').doc(uid).get();
    setData(doc.data());
  }

  // get projects with uid
  const query = firebase.firestore().collection('projects').where('uid', '==', uid);
  const [projects] = useCollectionData(query, {idField: 'id'});

  // get portfolio data on start
  useEffect(() => {
    getPortfolioData();
  }, []);

  // wait if no data or no projects yet
  if (!data || !projects) {
    return (
      <div className="Portfolio">
        <p>Loading portfolio...</p>
      </div>
    )
  }

  return (
    <div className="Portfolio text-center" style={{
      backgroundColor: data.bgColor,
      color: data.textColor
    }}>
      <h1>{data.title}</h1>
      <h2>{data.subtitle}</h2>
      <ProjectList />
    </div>
  );
}

export default Portfolio;
