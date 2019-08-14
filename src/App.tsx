import React, { useState, useEffect, SyntheticEvent } from 'react';
import Firebase from 'firebase';
import { firebaseConfig } from './firebase.config';
import './App.css';
import { Button, Container, Header, Icon, Segment, Checkbox, List, Item, Divider, ListHeader, Input } from 'semantic-ui-react';
import { string } from 'prop-types';
import { TodoItem } from './models';


const App: React.FC = () => {

  // Firebase.initializeApp(firebaseConfig);

  // const db = Firebase.firestore();

  // const items = db.collection('items').get().then((value) => {
  //   console.log(value.docs.map(doc => doc.data()));
  // });

  const [inputValue, setInputValue] = useState('');
  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);


  const addItem = () => {
    if (inputValue === '') {
      return;
    }

    setTodoItems([...todoItems, {
      done: false,
      text: inputValue,
    }]);
    setInputValue('');
  }

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.keyCode === 13) {
      addItem();
    }
  }

  const toggleValue = (item: TodoItem) => {
    item.done = !item.done;
    setTodoItems([...todoItems]);
  }

  const todoList = todoItems.filter(item => !item.done);
  const doneList = todoItems.filter(item => item.done);

  return (
    <div className="App">
      <Container textAlign="left">
        <Segment vertical>
          <Header as='h2'>
            <Icon name='list' />
            <Header.Content>
              TODO List
            </Header.Content>
          </Header>
        </Segment>

        <Segment vertical>
          <List selection verticalAlign='middle' size="big">
            {todoList.map((item, key) => {
              return (
                <List.Item key={key} onClick={() => toggleValue(item)}>
                  <List.Content floated="left"><Icon name={item.done ? 'check square outline' : 'square outline'} /></List.Content>
                  <List.Content>
                    <List.Header>{item.text}</List.Header>
                  </List.Content>
                </List.Item>
              );
            })}
          </List>

          <Input
            placeholder="Item da lista"
            type="text"
            value={inputValue}
            fluid
            onChange={(e) => setInputValue(e.target.value)}
            onKeyUp={handleKeyUp}
            icon="plus"
            iconPosition="left"
            action={{ icon: 'plus', onClick: addItem }} />
          <Divider />

          { doneList.length > 0 && 'Done:' }
          <List selection verticalAlign='middle' size="big">
            {doneList.map((item, key) => {
              return (
                <List.Item key={key} onClick={() => toggleValue(item)}>
                  <List.Content floated="left"><Icon name={item.done ? 'check square outline' : 'square outline'} /></List.Content>
                  <List.Content>
                    <List.Header>{item.text}</List.Header>
                  </List.Content>
                </List.Item>
              );
            })}
          </List>
        </Segment>
      </Container>
    </div>
  );
}

export default App;
