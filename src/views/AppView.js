import React from 'react';
import classnames from 'classnames';

function AppView(props){
  return (
    <div>
      <Header {...props} />
      <Main {...props} />
      <Footer {...props} />
    </div>
  )
}

function Header(props){
  return(
    <header id="header">
      <h1>todos</h1>
      <NewTodoInput {...props} />
    </header>
  )
}

function Main(props){
  if(props.todos.size === 0){
    return null;
  }

  const areAllComplete = props.todos.every( todo => todo.complete );

  return(
    <section id="main">
      <input
        id='toggle-all'
        type='checkbox'
        onChange={props.onToggleAllTodos}
        checked={areAllComplete}
      />
      <label htmlFor='toggle-all'>
        Mark all as completed
      </label>
      <ul id="todo-list">
        {[...props.todos.values()].reverse().map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            editing={props.editing}
            onToggleTodo={props.onToggleTodo}
            onDeleteTodo={props.onDeleteTodo}
            onStartEditingTodo={props.onStartEditingTodo}
            onStopEditingTodo={props.onStopEditingTodo}
            onUpdateTodo={props.onUpdateTodo}
          />
        ))}
      </ul>
    </section>
  )
}


const ENTER_KEY_CODE = 13;
function NewTodoInput(props){

  const onChange = (event) => props.onUpdateDraft(event.target.value);
  const addTodo = () => props.onAddTodo(props.draft);
  const onKeyDown = (event) => {
    if(event.keyCode == ENTER_KEY_CODE){
      addTodo();
    }
  }

  return(
    <input
      type='text'
      id="new-todo"
      value={props.draft}
      placeholder="Enter new task here!"
      onKeyDown={ onKeyDown }
      onChange={ onChange }
    />
  )
}

function TodoItem(props){
  const todo = props.todo;
  const isEditing = props.editing == todo.id;
  const onToggleTodo = () => props.onToggleTodo(todo.id);
  const onDeleteTodo = () => props.onDeleteTodo(todo.id);
  const onStartEditingTodo = () => props.onStartEditingTodo(todo.id);

  let input = null;  
  if(isEditing){

    const onChange = (event) => props.onUpdateTodo(todo.id, event.target.value);
    const stopEditingTodo = () => props.onStopEditingTodo();
    const onKeyDown = (event) => {
        if(event.keyCode == ENTER_KEY_CODE){
          stopEditingTodo();
        }
      };

    input = <input
              type='text'
              autoFocus={true}
              className='edit'
              onKeyDown={onKeyDown}
              onChange={onChange}
              onBlur={stopEditingTodo}
              value={todo.text}
            />;
  }


  return(
    <li key={todo.id} className={classnames({
        completed: todo.complete,
        editing: isEditing,
      })}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.complete}
          onChange={onToggleTodo}
        />
        <label
          onDoubleClick={ onStartEditingTodo }
        >
          {todo.text}
        </label>
        <button
          className='destroy'
          onClick={onDeleteTodo}
        />
      </div>
      {input}
    </li>
  )
}

function Footer(props){
  if (props.todos.size == 0){
    return null;
  }

  const remaining = props.todos.filter( todo => !todo.complete ).size;
  const completed = props.todos.size - remaining;
  const phrase = remaining === 1 ? ' item left' : ' items left';

  let clearCompletedButton = null;
  if(completed > 0){
    clearCompletedButton =
        <button
          id='clear-completed'
          onClick={props.onDeleteCompletedTodo}
          >
          Clear completed {completed}
        </button>
  }

  return(
    <footer id='footer'>
      <span id='todo-count'>
        <strong>
          {remaining}
        </strong>
        {phrase}
      </span>
      {clearCompletedButton}
    </footer>
  )
}

export default AppView;
