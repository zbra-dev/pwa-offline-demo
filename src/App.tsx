import React from 'react';
import Firebase from 'firebase';
import { firebaseConfig } from './firebase.config';
import './App.css';
import { Button } from 'semantic-ui-react';


const App: React.FC = () => {

  Firebase.initializeApp(firebaseConfig);


  const db = Firebase.firestore();

  const items = db.collection('items').get().then((value) => {
    console.log(value.docs.map(doc => doc.data()));
  });

  return (
    <div className="App">
      <Button content="Button" />
    </div>
  );
}

export default App;
