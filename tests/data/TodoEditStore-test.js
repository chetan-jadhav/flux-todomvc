'use strict';

import TodoActionTypes from '../../src/data/TodoActionTypes.js';
import TodoEditStore from '../../src/data/TodoEditStore.js';


describe('TodoEditStore', function(){

  beforeEach(function(){
    // Always start with initialize state.
    this.state = TodoEditStore.getInitialState();

    // This "dispatches" an action to our stores. We can bypass the dispatcher
    // and just call the store's reduce function directly.
    this.dispatch = action => {
      this.state = TodoEditStore.reduce(this.state, action);
    };

  });

  ///// BEGIN TESTS /////

  it('can return todo id once start editing', function(){
    expect(this.state).toEqual('');

    this.dispatch({
      type: TodoActionTypes.START_EDITING_TODO,
      id: 'id-1'
    })

    expect(this.state).toEqual('id-1');
  });


  it('can change todo id if specified another todo', function(){
    this.dispatch({
      type: TodoActionTypes.START_EDITING_TODO,
      id: 'id-1'
    })

    expect(this.state).toEqual('id-1');

    this.dispatch({
      type: TodoActionTypes.START_EDITING_TODO,
      id: 'id-4'
    })

    expect(this.state).toEqual('id-4');
  });


  it('can make empty state on stop editing', function(){
    this.dispatch({
      type: TodoActionTypes.START_EDITING_TODO,
      id: 'id-1'
    })

    expect(this.state).toEqual('id-1');

    this.dispatch({
      type: TodoActionTypes.STOP_EDITING_TODO,
    })

    expect(this.state).toEqual('');
  })

});
