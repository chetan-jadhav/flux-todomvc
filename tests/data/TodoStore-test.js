'use strict';

import Counter from '../../src/data/Counter.js';
import Todo from '../../src/data/Todo.js';
import TodoActionTypes from '../../src/data/TodoActionTypes.js';
import TodoStore from '../../src/data/TodoStore.js';


describe('TodoStore', function(){

  beforeEach(function(){
    // Always start with initialize state.
    this.state = TodoStore.getInitialState();

    // This function gets a more readable form of todos that we can pass
    // to expect()
    this.todos = () => Array.from(this.state.values()).map(todo => ({
      text: todo.text,
      complete: !!todo.complete,
    }));

    // This function is for setting up data, it will add all the todos to the
    // state in a direct way.
    this.addTodos = (todos) => {
      todos.forEach(todo => {
        const id = Counter.increment();
        this.state = this.state.set(
          id,
          new Todo({id, text: todo.text, complete: !!todo.complete}),
        );
      });
    };

    // Because of how TodoStore is set up it's not easy to get access to ids of
    // todos. This will get the id of a particular todo based on the index it
    // was added to state in.
    this.id = (index) => {
      if(this.state.size <= index){
        throw new Error(
          'Requested id for an index is larger than the size of the ' +
          'current state.'
        );
      }
      return Array.from(this.state.keys())[index];
    };

    // This "dispatches" an action to our stores. We can bypass the dispatcher
    // and just call the store's reduce function directly.
    this.dispatch = action => {
      this.state = TodoStore.reduce(this.state, action);
    };
  });



  ///// BEGIN TESTS /////

  it('can add multiple todos', function(){
    expect(this.todos()).toEqual([]);

    this.dispatch({
      type: TodoActionTypes.ADD_TODO,
      text: 'Learn react!',
    });

    expect(this.todos()).toEqual([
      {text: 'Learn react!', complete: false},
    ]);

    this.dispatch({
      type: TodoActionTypes.ADD_TODO,
      text: 'Learn flux!',
    });

    expect(this.todos()).toEqual([
      {text: 'Learn react!', complete: false},
      {text: 'Learn flux!', complete: false},
    ]);
  });


  it('only removes completed todos', function(){
    this.addTodos([
      {text: 'Learn react!', complete: true},
      {text: 'Learn flux!', complete: true},
      {text: 'Do unit testing!', complete: false},
    ]);

    this.dispatch({
      type: TodoActionTypes.DELETE_COMPLETED_TODO,
    });

    expect(this.todos()).toEqual([
      {text: 'Do unit testing!', complete: false},
    ]);
  });


  it('can delete specific todo', function(){
    this.addTodos([
      {text: 'Learn react!', complete: false},
      {text: 'Learn flux!', complete: true},
      {text: 'Do unit testing!', complete: false},
    ]);

    this.dispatch({
      type: TodoActionTypes.DELETE_TODO,
      id: this.id(2),
    });

    expect(this.todos()).toEqual([
      {text: 'Learn react!', complete: false},
      {text: 'Learn flux!', complete: true},
    ]);

    this.dispatch({
      type: TodoActionTypes.DELETE_TODO,
      id: this.id(0),
    });

    expect(this.todos()).toEqual([
      {text: 'Learn flux!', complete: true},
    ]);
  });


  it('can edit specific todo', function(){
    this.addTodos([
      {text: 'Learn react!', complete: false},
      {text: 'Learn flux!', complete: true},
      {text: 'Do unit testing!', complete: false},
    ]);

    this.dispatch({
      type: TodoActionTypes.UPDATE_TODO,
      id: this.id(2),
      text: 'Complete unit testing for stores!',
    });

    expect(this.todos()).toEqual([
      {text: 'Learn react!', complete: false},
      {text: 'Learn flux!', complete: true},
      {text: 'Complete unit testing for stores!', complete: false},
    ]);
  });


  it('mark all todos completed if any are incomplete', function(){
    this.addTodos([
      {text: 'Learn react!', complete: false},
      {text: 'Learn flux!', complete: true},
      {text: 'Do unit testing!', complete: false},
    ]);

    this.dispatch({
      type: TodoActionTypes.TOGGLE_ALL_TODOS,
    });

    expect(this.todos()).toEqual([
      {text: 'Learn react!', complete: true},
      {text: 'Learn flux!', complete: true},
      {text: 'Do unit testing!', complete: true},
    ]);
  });


  it('mark all todos incomplete if all are complete', function(){
    this.addTodos([
      {text: 'Learn react!', complete: true},
      {text: 'Learn flux!', complete: true},
      {text: 'Do unit testing!', complete: true},
    ]);

    this.dispatch({
      type: TodoActionTypes.TOGGLE_ALL_TODOS,
    });

    expect(this.todos()).toEqual([
      {text: 'Learn react!', complete: false},
      {text: 'Learn flux!', complete: false},
      {text: 'Do unit testing!', complete: false},
    ]);
  });


  it('toggle particular todo', function(){
    this.addTodos([
      {text: 'Learn react!', complete: false},
      {text: 'Learn flux!', complete: false},
      {text: 'Do unit testing!', complete: false},
    ]);

    this.dispatch({
      type: TodoActionTypes.TOGGLE_TODO,
      id: this.id(1),
    });

    expect(this.todos()).toEqual([
      {text: 'Learn react!', complete: false},
      {text: 'Learn flux!', complete: true},
      {text: 'Do unit testing!', complete: false},
    ]);

    this.dispatch({
      type: TodoActionTypes.TOGGLE_TODO,
      id: this.id(0),
    });

    expect(this.todos()).toEqual([
      {text: 'Learn react!', complete: true},
      {text: 'Learn flux!', complete: true},
      {text: 'Do unit testing!', complete: false},
    ]);

    this.dispatch({
      type: TodoActionTypes.TOGGLE_TODO,
      id: this.id(2),
    });

    expect(this.todos()).toEqual([
      {text: 'Learn react!', complete: true},
      {text: 'Learn flux!', complete: true},
      {text: 'Do unit testing!', complete: true},
    ]);

    this.dispatch({
      type: TodoActionTypes.TOGGLE_TODO,
      id: this.id(2),
    });

    expect(this.todos()).toEqual([
      {text: 'Learn react!', complete: true},
      {text: 'Learn flux!', complete: true},
      {text: 'Do unit testing!', complete: false},
    ]);
  });

});
