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
    constructor(props){
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

function autorun(todo){
    console.log(this, todo);
}

export default class TodoList{
    constructor(props){
    }

    todos = [];

    @Computed(autorun)
    add(todo){
        this.todos.push(todo);
    }
}
```

Store.js

```javascript
export const todoList = new TodoList();
```

Page.js

```javascript
import { todoList } from 'Store';   // 在需要使用的地方引入即可
class TodoListView extends Component {
    render() {
        return <div>
            <ul>
                {todoList.todos.map(todo =>
                    <li todo={todo} key={todo.id} />
                )}
            </ul>
        </div>
    }
}
```
