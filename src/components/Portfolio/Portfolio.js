import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';

function Portfolio() {
  const [data, setData] = useState(undefined);

  async function getPortfolioData() {
    const uid = 'test-uid';
    const doc = await firebase.firestore().collection('portfolios').doc(uid).get();
    setData(doc.data());
  }

  // get portfolio data on start
  useEffect(() => {
    getPortfolioData();
  }, []);

  // wait if no data yet
  if (!data) {
    return (
      <div className="Portfolio">
        <p>Retrieving portfolio...</p>
      </div>
    )
  }

  return (
    <div className="Portfolio">
      <h1>{data.title}</h1>
      <h2>{data.subtitle}</h2>
      <p>{data.content}</p>
    </div>
  );
}

export default Portfolio;
