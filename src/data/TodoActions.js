import TodoActionTypes from './TodoActionTypes';
import TodoDispatcher from './TodoDispatcher';

const Actions = {

  addTodo(text){
    TodoDispatcher.dispatch({
      type: TodoActionTypes.ADD_TODO,
      text,
    });
  },

  deleteTodo(id){
    TodoDispatcher.dispatch({
      type: TodoActionTypes.DELETE_TODO,
      id,
    });
  },

  toggleTodo(id){
    TodoDispatcher.dispatch({
      type: TodoActionTypes.TOGGLE_TODO,
      id,
    });
  },

  updateDraft(text){
    TodoDispatcher.dispatch({
      type: TodoActionTypes.UPDATE_DRAFT,
      text,
    })
  },

  deleteCompletedTodo(){
    TodoDispatcher.dispatch({
      type: TodoActionTypes.DELETE_COMPLETED_TODO,
    })
  },

  toggleAllTodos(){
    TodoDispatcher.dispatch({
      type: TodoActionTypes.TOGGLE_ALL_TODOS,
    })
  },

  startEditingTodo(id){
    TodoDispatcher.dispatch({
      type: TodoActionTypes.START_EDITING_TODO,
      id,
    })
  },

  stopEditingTodo(){
    TodoDispatcher.dispatch({
      type: TodoActionTypes.STOP_EDITING_TODO,
    })
  },

  updateTodo(id, text){
    TodoDispatcher.dispatch({
      type: TodoActionTypes.UPDATE_TODO,
      id,
      text,
    })
  }

};

export default Actions;
