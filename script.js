const form = document.querySelector('#itemForm'); // select form
const input = document.querySelector('#input'); // select input box from form
const todoList = document.querySelector('.todo-list');
const news = document.querySelector('.news');
const clearAll = document.querySelector('#clear-All');

let todoItems = [];

//what should happen if the user clicks the actions?
const iconsActions = function(ourItems){
    
    //remeber we have  item class from the perform function
    const items = todoList.querySelectorAll('.item');
 
    items.forEach(function(item){
        
        //check if the text is the same,then...
        if(item.querySelector('.item-name').textContent === ourItems){
            
            //for the complete icon
            item.querySelector('.complete-item').addEventListener('click', function(){
                //add class completed to the classlist
                item.querySelector('.item-name').classList.toggle('completed');
                //also add class visibility
                this.classList.toggle('visibility');
            });
            //for the edit icon
            item.querySelector('.edit-item').addEventListener('click', function(){
                input.value = ourItems;
                //remove the item
                todoList.removeChild(item);
                //this part is to filter the todoItems, then change it so that the removed item wont be there anymore.
                todoItems = todoItems.filter(function(item){
                    return item !== ourItems;
                });
            });
            // for the delete icon
            item.querySelector('.delete-item').addEventListener('click', function(){
                //remove item's html from the todolist div
                todoList.removeChild(item);
                //this part is to filter the todoItems, then change it so that the removed item wont be there anymore.
                todoItems = todoItems.filter(function(item){
                    return item !== ourItems;
                });
                

                
            })
        }
    })
}




const perform = function(todoItems){
    todoList.innerHTML = '';
        
        //for each items in to do items
        todoItems.forEach(function(item){
            //insert that item inside to do list just before its end, then insert it with three icons (edit,delete and complete)
            todoList.insertAdjacentHTML('beforeend', `<div class="item my-3"><h5 class="item-name text-capitalize">${item}</h5><div class="item-icons"><a href="#" class="complete-item mx-2 item-icon"><i class="far fa-check-circle"></i></a><a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a><a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a></div></div>` );
            
            //then take some actions on the icons, scroll up  to see
            iconsActions(item);
        });
}

//this is to get our items back
const getLocalStorage = function(){
    //the getItem method helps in retrieving the todoItems value which is the array
    const todoStorage = localStorage.getItem('todoItems');
    if (todoStorage === 'undefined' || todoStorage === null){
        todoItems = [];
    }
    else {
        //.parse will help us turn it back into an object
        todoItems = JSON.parse(todoStorage);
        perform(todoItems);
    }
}


//here we set the local storage with key todoitems and value todoitems, the localstorage.setItem only allows for stings, the JSON.stringify helps us pass in a list item by converting to string first
const setLocalStorage = function(todoItems){
    localStorage.setItem('todoItems', JSON.stringify(todoItems));
}

// get local storage from page
getLocalStorage();



//add an item to the List
form.addEventListener('submit', function(e){ 
    e.preventDefault();
    const ourItems = input.value;
    //check if user inputs something and alerts warning
    if (ourItems.length === 0){
        news.innerHTML = 'you have things to do';
        //add a class to news class
        news.classList.add('showItem', 'alert-danger');

        //make the class disapear after 3seconds
        setTimeout(
            function(){
                news.classList.remove('showItem');
                }, 3000);
    }

    //put the collected item into a list called todoItems
    else {
        todoItems.push(ourItems);
        //put it in the local storage
        setLocalStorage(todoItems);
        //perform some actions on it, scroll up to see
        perform(todoItems);
        
    }
    //empty up the input space
    input.value = '';

    });

//clear all items from the list and also ffrom local storage
clearAll.addEventListener('click', function(){
    todoItems = [];
    localStorage.clear();
    perform(todoItems);
})



  

