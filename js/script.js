$(document).ready(function () {
    class TodoList {
        constructor() {
            this.todoInput = $('.todo-add input');
            this.todoLists = $('#todo-list')
            this.lists = []
        }
        initialize() {
            $('.todo-add span').click(function (e) {
                $(this).toggleClass('checked');
            });
            this.todoInput[0].addEventListener('keyup', (e) => {
                if (e.keyCode === 13 && this.todoInput[0].value.trim()) {
                    if ($('.todo-add span')[0].classList.contains('checked')) {
                        this.addList(this.todoInput[0].value, true)
                    }
                    else {
                        this.addList(this.todoInput[0].value, false)
                    }
                    //console.log(this.todoInput[0].value)
                    this.todoInput[0].value = null
                    $('.todo-add span').removeClass('checked')
                }
                e.preventDefault();
            })
            $('#clear-completed').click((this.clearCompleted).bind(this))
            this.countCompleted()
            this.filterToggle()
        }
        addList(list, status) {
            let elem = this.createDOM(list, status);
            elem.addEventListener('click', (e) => {
                if (e.target == elem.querySelector('span')) {
                    $(elem).toggleClass('checked')
                }
                else if (e.target == elem.querySelector('.delete')) {
                    $(elem).addClass('removing')
                    this.deleteTodo()
                }
                this.countCompleted()
            })
            var isExisiting = false
            this.lists.forEach(itm => {
                if (itm.querySelector('p').innerText.toLowerCase() == list.toLowerCase()) {
                    isExisiting = isExisiting || true
                }
            })
            if (isExisiting) {
                alert('Todo already in List!')
            }
            else {
                this.lists = this.lists.concat([elem])
                $(this.todoLists).append(elem)
                this.countCompleted()
                this.filter()
            }
        }
        createDOM(list, status) {
            let li = document.createElement('li')
            let span = document.createElement('span')
            span.className = 'check'
            let p = document.createElement('p')
            let nav = document.createElement('nav')
            nav.className = 'delete'
            p.innerText = list
            if (status) {
                li.className = 'checked'
            }
            li.appendChild(span)
            li.appendChild(p)
            li.appendChild(nav)
            return li
        }
        countCompleted() {

            let allTodo = 0;
            let completedTodo = 0;
            this.lists.forEach(li => {
                if (!li.classList.contains('hidden')) {
                    allTodo += 1
                    if (li.classList.contains('checked')) {
                        completedTodo += 1;
                    }
                }
            })
            $('#task-left').text(`Completed ${completedTodo}/${allTodo}`);
            if (allTodo > 0) {
                $('.info').show()
                $('#empty').hide()
            }
            else {
                $('.info').hide()
                $('#empty').show()
            }
        }
        clearCompleted() {
            let tempList = [...this.lists]
            let i = 0;
            this.lists.forEach((li, idx) => {
                if (!li.classList.contains('hidden')) {
                    if (li.classList.contains('checked')) {
                        li.remove()
                        tempList.splice(idx - i, 1)
                        i++;
                    }
                }
            })
            this.lists = tempList
            this.countCompleted()
        }
        filterToggle() {
            $('.filter-tab nav').each((idx, itm) => {
                $(itm).click(() => {
                    $(itm).parent().children().removeClass('active')
                    $(itm).addClass('active')
                    this.filter()
                })
            })
        }
        filter() {
            let type = $('.filter-tab nav.active').text().toLowerCase()
            $(this.todoLists[0].querySelectorAll('li')).addClass('hidden')
            if (type == 'completed') {
                $(this.todoLists[0].querySelectorAll('.checked')).removeClass('hidden')
            }
            else {
                $(this.todoLists[0].querySelectorAll('li')).removeClass('hidden')
            }
            this.countCompleted()
        }
        deleteTodo() {
            this.lists.forEach((li, idx) => {
                if (li.classList.contains('removing')) {
                    li.remove()
                    this.lists.splice(idx, 1)
                }
            })
        }
    }
    const todoList = new TodoList
    todoList.initialize()
});