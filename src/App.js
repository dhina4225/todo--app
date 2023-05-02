import React, { Component } from 'react';
import './App.css';

import AddMyTodoItem from './AddMyTodoItem'
import MyTodoItem from './MyTodoItem'

const myTodos = [
  // {
  //   name: 'Rent Paying',
  //   price: 2
  // },
  // {
  //   name: 'Bike Riding',
  //   price: 1
  // },

];

localStorage.setItem('myTodos', JSON.stringify(myTodos));

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      myTodos: JSON.parse(localStorage.getItem('myTodos'))
    };

    this.onAdd = this.onAdd.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
  }
  componentWillMount(){
    const myTodos = this.getmyTodos();
    this.setState({ myTodos })
  }

  getmyTodos() {
    return this.state.myTodos;
  }

  onAdd(name, price) {
    //console.log(name, price)
    const myTodos = this.getmyTodos();
    myTodos.push({
      name,
      price
    });

    this.setState({ myTodos })
  }

  onDelete(name){
    const myTodos = this.getmyTodos();

    const filteredmyTodos = myTodos.filter(indianFood => {
      return indianFood.name !== name;
    });

    this.setState({ myTodos: filteredmyTodos })
  }

  onEditSubmit(name, price, originalName){
    let myTodos = this.getmyTodos();

    myTodos = myTodos.map(indianFood => {
      if(indianFood.name === originalName){
        indianFood.name = name;
        indianFood.price = price;
      }

      return indianFood;

    });

    this.setState({ myTodos })
    
  }

  render() {
    return (
      <div className="App">
        <h1>My TODOS</h1>

        <AddMyTodoItem
          onAdd={this.onAdd}

        />
          {
            this.state.myTodos.map(indianFood => {
              return (
                <MyTodoItem
                  key={indianFood.name}
                  {...indianFood}
                  onDelete={this.onDelete}
                  onEditSubmit={this.onEditSubmit}
              />
            );
          })
          }
      </div>
    );
  }
}

export default App;
