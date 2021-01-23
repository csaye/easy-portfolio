import firebase from 'firebase/app';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import ProjectEdit from '../ProjectEdit/ProjectEdit.js';

function ProjectEditList() {
  // get uid
  const uid = 'test-uid';

  // get projects with uid ordered by date descending
  const query = firebase.firestore().collection('projects')
  .where('uid', '==', uid)
  .orderBy('date', 'desc');
  const [projects] = useCollectionData(query, {idField: 'id'});

  async function newProject() {
    await firebase.firestore().collection('projects').add({
      title: '',
      description: '',
      date: new Date(),
      uid: uid,
      url: ''
    });
  }

  // if loading projects, wait
  if (!projects) {
    return (
      <div className="ProjectEditList">
        <p>Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="ProjectEditList">
      <button onClick={newProject}>New Project</button>
      <div className="projects">
      {
        projects.length > 0 ?
        projects.map(p => <ProjectEdit key={p.id} data={p} />) :
        <p>No projects yet.</p>
      }
      </div>
    </div>
  );
}

export default ProjectEditList;
