import './App.css';
import { Container, Header, Icon, Segment, List, Divider, Input, Button } from 'semantic-ui-react';
import { TodoItem, compareDates } from './models';
import ItemsRepository from './items.repository';
import React from 'react';

const uuid = require('uuid/v4');

export default class App extends React.Component {
  rep: ItemsRepository;
  state: { [key: string]: any };

  constructor(props: any) {
    super(props);
    this.rep = new ItemsRepository();

    this.state = {
      data: [],
      inputValue: '',
    };

    this.rep.subscribe(snapshot => {
      this.setState({ data: snapshot });
    });

  }

  addItem() {
    if (this.state.inputValue === '') {
      return;
    }

    const newItem: TodoItem = {
      id: uuid(),
      done: false,
      text: this.state.inputValue,
      createdAt: (new Date()).toISOString(),
    }

    this.rep.add(newItem);
    this.setState({ inputValue: '' });
  }

  deleteItem(event: React.MouseEvent, id: string) {
    event.stopPropagation();
    this.rep.delete(id);
  }

  updateItem(item: TodoItem) {
    item.done = !item.done;
    this.rep.update(item);
  }

  handleKeyUp(e: KeyboardEvent) {
    if (e.keyCode === 13) {
      this.addItem();
    }
  }

  render() {
    const todoList = this.state.data.filter((item: TodoItem) => !item.done).sort(compareDates);
    const doneList = this.state.data.filter((item: TodoItem) => item.done).sort(compareDates);

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
              {todoList.map((item: TodoItem, key: number) => {
                return (
                  <List.Item key={key} onClick={() => this.updateItem(item)}>
                    <List.Content floated="left"><Icon name={item.done ? 'check square outline' : 'square outline'} /></List.Content>
                    {item.text}
                    <List.Content floated="right">
                      <Button icon onClick={(e) => this.deleteItem(e, item.id)}>
                        <Icon name="trash" /></Button>
                    </List.Content>
                  </List.Item>
                );
              })}
            </List>

            <Segment basic>
              <Input
                placeholder="List item"
                type="text"
                value={this.state.inputValue}
                fluid
                onChange={(e) => this.setState({ inputValue: e.target.value })}
                onKeyUp={(e: any) => this.handleKeyUp(e)}
                action={{ icon: 'plus', onClick: () => this.addItem() }} />
            </Segment>
            <Divider />

            {doneList.length > 0 && 'Done:'}
            <List selection verticalAlign='middle' size="big">
              {doneList.map((item: TodoItem, key: number) => {
                return (
                  <List.Item key={key} onClick={() => this.updateItem(item)}>
                    <List.Content floated="left"><Icon name={item.done ? 'check square outline' : 'square outline'} /></List.Content>
                    {item.text}
                    <List.Content floated="right">
                      <Button icon onClick={(e) => this.deleteItem(e, item.id)}>
                        <Icon name="trash" /></Button>
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
}

