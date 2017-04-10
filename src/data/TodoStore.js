'use strict'

import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';
import TodoActionTypes from './TodoActionTypes';
import TodoDispatcher from './TodoDispatcher';
import Counter from '../data/Counter';
import Todo from '../data/Todo';

class TodoStore extends ReduceStore {
  constructor(){
    super(TodoDispatcher);
  }

  getInitialState(){
    return Immutable.OrderedMap();
  }

  reduce(state, action){
    switch (action.type) {
      case TodoActionTypes.ADD_TODO:
        if(!action.text){
          return state;
        }

        const id = Counter.increment();

        return state.set(id, new Todo({
          id,
          text: action.text,
          complete: false,
        }));

      case TodoActionTypes.UPDATE_TODO:
        return state.setIn([action.id, 'text'], action.text);

      case TodoActionTypes.DELETE_TODO:
        return state.delete(action.id);

      case TodoActionTypes.TOGGLE_TODO:
        return state.update(
          action.id,
          todo => todo.set('complete', !todo.complete),
        );

      case TodoActionTypes.DELETE_COMPLETED_TODO:
        return state.filter( todo => !todo.complete);

      case TodoActionTypes.TOGGLE_ALL_TODOS:
        const areAllComplete = state.every(todo => todo.complete)
        return state.map( todo => todo.set('complete', !areAllComplete) )

      default:
        return state;
    }
  }

}

export default new TodoStore();
