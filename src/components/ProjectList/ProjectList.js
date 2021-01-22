import firebase from 'firebase/app';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import Project from '../Project/Project.js';

function ProjectList() {
  // get uid
  const uid = 'test-uid';

  // get projects with uid ordered by date
  const query = firebase.firestore().collection('projects')
  .where('uid', '==', uid)
  .orderBy('date', 'desc');
  const [projects] = useCollectionData(query, {idField: 'id'});

  // if loading projects, wait
  if (!projects) {
    return (
      <div className="ProjectList">
        <p>Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="ProjectList">
    {
      projects.map(p => <Project key={p.id} data={p} />)
    }
    </div>
  );
}

export default ProjectList;
