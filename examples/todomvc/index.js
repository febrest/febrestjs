var providers = {

}




/**
 * views
 */

var container = document.getElementsByClassName('container')[0];

function headers() {
    return (
        '<h1 class=\"header\">todos</h1>'
    );
}

function newTodo() {
    return (
        '<p class="new-todo-container">'
        + '<input class="new-todo" placeholder="需要做什么？"/>'
        + '</p>'
    );
}
function mergeView(vc) {
    var views = []
    for (var i = 0, l = vc.length; i < l; i++) {
        views.push(vc[i].view(vc[i].props));
    }
    return views.join('\r\n');
}

function render(html) {
    container.innerHTML = html;
}

function start() {
    render(mergeView(
        [
            {
                view: headers
            },
            {
                view: newTodo
            },
        ]
    ));
}

start();