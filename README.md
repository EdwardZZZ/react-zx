# react-zx

react state management
此组件在需要的地方引入即可，适用于使用地方较多，更改不频繁的数据管理，最大的好处是减少props

### Installation
    npm install --save react-zx

### entry

```javascript
import { Provider } from 'react-zx';

render(<Provider><Index /></Provider>, document.getElementById('app'));
```

### model


Todo.js

```javascript
import { Computed, assign } from 'react-zx';    // 此assign只赋值自身值非对象的属性

export default class Todo{
    constructor(id, title){
        this.id = id;
        this.title = title;
    }

    id;
    title;

    @Computed
    setTitle(title){
        this.title = title;
    }

    @Computed
    setting(params){
        assign(this, params);
    }
}
```

TodoList.js

```javascript
import { Computed } from 'react-zx';

export default class TodoList{

    todos = [];

    @Computed(autorun)
    add(todo){
        this.todos.push(todo);
    }
}

function autorun(todo){
    console.log(this, todo);
}
```

Store.js

```javascript
import TodoList from './model/TodoList';

export const todoList = new TodoList();
```

Page.js

```javascript
import React from 'react';
import { todoList } from './zx/Store';   // 在需要使用的地方引入即可

import Todo from './zx/model/Todo';

export default class TodoListView extends React.Component {
    constructor(){
        super();

        todoList.add(new Todo(1, 'todo title 1'))
    }

    render() {
        return <div>
            <ul>
                {todoList.todos.map(todo => 
                    <li key={todo.id} onClick={this.changeTitle.bind(this, todo)} >{todo.title}</li>
                )}
            </ul>
            <button onClick={this.add}>添加</button>
        </div>
    }

    changeTitle(todo){
        todo.setTitle(todo.title + '.')
    }

    add = () => {
        let n = todoList.todos.length + 1;
        todoList.add(new Todo(n, `todo title ${n}`));
    }
}
```
