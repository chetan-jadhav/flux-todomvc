import AppView from '../views/AppView';
import { Container } from 'flux/utils';
import TodoStore from '../data/TodoStore';
import TodoDraftStore from '../data/TodoDraftStore';
import TodoEditStore from '../data/TodoEditStore';
import TodoActions from '../data/TodoActions';

function getStores(){
  return [
    TodoStore,
    TodoDraftStore,
    TodoEditStore,
  ];
}

function getState(){
  return {
    todos: TodoStore.getState(),
    draft: TodoDraftStore.getState(),
    editing: TodoEditStore.getState(),


    onDeleteTodo: TodoActions.deleteTodo,
    onToggleTodo: TodoActions.toggleTodo,
    onUpdateDraft: TodoActions.updateDraft,
    onAddTodo: TodoActions.addTodo,
    onDeleteCompletedTodo: TodoActions.deleteCompletedTodo,
    onToggleAllTodos: TodoActions.toggleAllTodos,
    onStartEditingTodo: TodoActions.startEditingTodo,
    onStopEditingTodo: TodoActions.stopEditingTodo,
    onUpdateTodo: TodoActions.updateTodo,
  }
}

export default Container.createFunctional(AppView, getStores, getState);
