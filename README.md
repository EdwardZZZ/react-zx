# react-zx

react state management

### Installation
    npm install --save react-zx

## useage
<https://github.com/EdwardZZZ/react-zx-eg>


### entry

```javascript
import { Provider } from 'react-zx';

render(<Provider><Index /></Provider>, document.getElementById('app'));
```

### model


Todo.js

```javascript
import { Computed } from 'react-zx';

export default class Todo{
    constructor(props){
    }

    id;
    title;

    @Computed
    setTitle(title){
        this.title = title;
    }
}
```

TodoList.js

```javascript
import { Computed } from 'react-zx';

function autorun(){
    console.log(1);
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
