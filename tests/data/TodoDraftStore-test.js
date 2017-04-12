'use strict';

import TodoActionTypes from '../../src/data/TodoActionTypes.js';
import TodoDraftStore from '../../src/data/TodoDraftStore.js';

describe('TodoDraftStore', function(){

  beforeEach(function(){
    // Always start with initialize state.
    this.state = TodoDraftStore.getInitialState();

    // This "dispatches" an action to our stores. We can bypass the dispatcher
    // and just call the store's reduce function directly.
    this.dispatch = action => {
      this.state = TodoDraftStore.reduce(this.state, action);
    }
  });


  ///// BEGIN TESTS /////

  it('can return text while updating draft', function(){
    expect(this.state).toEqual('');

    this.dispatch({
      type: TodoActionTypes.UPDATE_DRAFT,
      text: 'Do unit testing for stores',
    });

    expect(this.state).toEqual('Do unit testing for stores');

    this.dispatch({
      type: TodoActionTypes.UPDATE_DRAFT,
      text: 'Do unit testing for all stores',
    });

    expect(this.state).toEqual('Do unit testing for all stores');

    this.dispatch({
      type: TodoActionTypes.UPDATE_DRAFT,
      text: 'Do unit testing for all stores!',
    });

    expect(this.state).toEqual('Do unit testing for all stores!');

  });


  it('make state empty on add todo', function(){
    this.dispatch({
      type: TodoActionTypes.UPDATE_DRAFT,
      text: 'Do unit testing for all stores!'
    });

    expect(this.state).toEqual('Do unit testing for all stores!');

    this.dispatch({
      type: TodoActionTypes.ADD_TODO,
    });

    expect(this.state).toEqual('');
  });

});
