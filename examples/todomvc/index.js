/**
 * @constants
 */

var constants = {
    GET_ALL_TODOS: 'GET_ALL_TODOS',
    GET_COMPLETE: 'GET_COMPLETE',
    GET_ACTIVE: 'GET_ACTIVE',
    SET_COMPLETE: 'SET_COMPLETE',
    ADD_TODO: 'ADD_TODO',
    REMOVE_TODO: 'REMOVE_TODO'
}

/**
 * provider configs
 */

var providers = [
    {
        name: 'todos',
        defaultState: []
    },
]

/**
 * controllers
 */

var controllers = {
    addTodos: function (todos, $payload) {
        var payload = $payload();
        var todo = {
            complete: false,
            message: payload
        }
        let data = todos.query();
        data.push(todo);
        todos.update(null,data);
        return {
            todos: data
        }
    },
    removeTodos: function (todos, $payload) {
        var payload = $payload();
        let data = todos.query();
        data.splice(payload, 1);
        todos.update(null,data);
        return { todos:data };
    },
    getAll: function (todos) {
        let data = todos.query();
        var complete = controllers.getComplete(todos).complete;
        var active = controllers.getActive(todos).active;
        return { todos: data, complete, active };
    },
    getComplete: function (todos) {
        let data = todos.query()||[];
        var complete = data.filter(function (v) {
            return v.complete;
        });
        return { complete: complete };
    },
    complete: function ($payload, todos) {
        var payload = $payload();
        let data = todos.query();
        data[payload].complete = true;
        todos.update(null,data);
        return {
            todos: data,
        }
    },
    getActive: function (todos) {
        let data = todos.query();
        var active = data.filter(function (v) {
            return !v.complete;
        });
        return { active: active };
    },
}

/**
 * actions configs
 */

var actions = [
    {
        key: constants.ADD_TODO,
        controller: controllers.addTodos,

    },
    {
        key: constants.GET_ALL_TODOS,
        controller: controllers.getAll
    },
    {
        key: constants.GET_COMPLETE,
        controller: controllers.getComplete
    },
    {
        key: constants.GET_ACTIVE,
        controller: controllers.getActive
    },
    {
        key: constants.SET_COMPLETE,
        controller: controllers.complete
    },
    {
        key: constants.REMOVE_TODO,
        controller: controllers.removeTodos
    }
]


/**
 * config
 */

Febrest.createActions(actions);
Febrest.injectProvider(providers);

/**
 * views
 */

var container = document.getElementsByClassName('container')[0];

function checkBox(checked, index) {
    return (
        '<span class="checkbox'
            + (checked ? ' checked' : '')
            + '"fbclick="Febrest.dispatch(constants.SET_COMPLETE,'+index+')">'
            + '</span>'
    );
}
function item(todo, index) {
    var status = todo.complete ? '已完成' : '未完成';
    return (
        '<li>'
        + checkBox(todo.complete, index)
        + todo.message
        + '<p class="right">'
        + status
        + '<span class="delete" fbclick="Febrest.dispatch(constants.REMOVE_TODO,'+index+')">'
        + 'x'
        + '</span>'
        + '</p>'
        + '</li>'
    );
}

var app = {
    state: {
        complete: [],
        todos: [],
        active: [],
        type: 'all'
    },
    setState(state) {
        this.state = Object.assign(this.state, state);
        this.update();
    },
    update() {
        var data = [];
        switch (this.state.type) {
            case 'all':
                data = this.state.todos;
                break;
            case 'complete':
                data = this.state.complete;
                break;
            case 'active':
                data = this.state.active;
                break;
        }
        this.updateList(data)
        this.updateFooter({ count: data.length, type: this.state.type })
    },
    updateList(data) {
        var list = document.getElementsByClassName('list')[0];
        list.innerHTML = data.map(function (todo, i) {
            return item(todo, i);
        }).join('\r\n');
    },
    updateFooter(props) {
        var spans = document.querySelectorAll('.filters span');
        switch (props.type) {
            case 'all':
                spans[0].className = 'selected';
                spans[1].className = '';
                spans[2].className = '';
                break;
            case 'active':
                spans[0].className = '';
                spans[1].className = 'selected';
                spans[2].className = '';
                break;
            case 'complete':
                spans[0].className = '';
                spans[1].className = '';
                spans[2].className = 'selected';
                break;
            default:
                break;
        }
    },
    changeType(type) {
        this.setState({ type });
    },
    onData(result) {
        switch (result.key) {                
            default:
                app.setState(result.state);
                break;
        }
    }
}

function start() {
    bindEvent();
    Febrest.dispatch(constants.GET_ALL_TODOS);
}

/**
 * bind event
 */

function onKeyDown(e) {
    if (e.target.value == '') {
        return;
    }
    if (e.target.className === 'new-todo' && e.key === 'Enter') {
        Febrest.dispatch(constants.ADD_TODO, e.target.value);
        e.target.value = '';
    }
}
function onClick(e) {
    if (e.target.attributes.fbclick) {
        return eval(e.target.attributes.fbclick.value);
    }
}
function bindEvent() {
    container.addEventListener('keydown', onKeyDown, false);
    container.addEventListener('click', onClick, false);
}


Febrest.subscribe(app.onData);
Febrest.watch(function(changed){
    if(changed.todos){
        Febrest.dispatch(constants.GET_ALL_TODOS);
    }
    
})
start();