// ************* SELECT ITEMS ***************
const alert1 = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');

// edit option
let editElement;
let editFlag = false;
let editID = "";
// ************* EDIT EVENT LISTENER ***************
//submit form
form.addEventListener('submit',addItem)
// clear button
clearBtn.addEventListener('click',clearItems)
// load items
window.addEventListener('DOMContentLoaded',setUpItems);
// ************* FUNCTION ***************
function addItem(e){
    e.preventDefault();
    console.log(grocery.value);
    const value = grocery.value;
    const id = new Date().getTime().toString();
    console.log(id);
    if(value && !editFlag){
        createListItems(id,value);
        // display alert
        displayAlert('item added to the list','sucess');
        // show container
        container.classList.add('show-container');
        // add to local storage
        addToLocalStorage(id,value);
        // set back to default
        setBackToDefault();
        console.log('add item to the list');
    }
    else if(value   && editFlag === true){
        editElement.innerHTML = value;
        displayAlert('value changed','sucess');
        //  edit local storage
        editLocalStorage(editID,value);
        setBackToDefault();
    }
    else{
       displayAlert('please enter value','danger');
    }
}
// display alert
function displayAlert(text,action){
    alert1.textContent = text;
    alert1.classList.add(`alert-${action}`);
    // remove alert
    setTimeout(function(){
    alert1.textContent = '';
    alert1.classList.remove(`alert-${action}`);
        
    },1000)
}
// clear items
function clearItems(){
    const items = document.querySelectorAll('.grocery-item');

    if(items.length > 0){
        items.forEach(function(item){
            list.removeChild(item);
        });
    }
    container.classList.remove('show-container');
    displayAlert('empty list','danger');
    setBackToDefault();
    // localStorage.removeItem('list');
}
// delete function
function deleteItem(e){
 const element = e.currentTarget.parentElement.parentElement;
 const id = element.dataset.id;
 list.removeChild(element);
 if(list.children.length === 0){
    container.classList.remove('show-container');
 }
 displayAlert('item removed','danger');
 // remove from local storage
 removeFromLocalStorage(id);
}
// edit function
function editItem(e){
 const element = e.currentTarget.parentElement.parentElement;
 // set edit item
 editElement = e.currentTarget.parentElement.previousElementSibling;
 // set form value
 grocery.value = editElement.innerHTML;
 editFlag = true;
 editID = element.dataset.id;
 submitBtn.textContent = 'edit';
}
// setback to default
function setBackToDefault(){
    grocery.value = '';
    editFlag = false;
    editID = '';
    submitBtn.textContent = 'submit';
}
// ************* LOCAL STORAGE ***************
function addToLocalStorage(id,value){
    const grocery = {id,value};
    console.log(grocery);
    let items = getLocalStorage();   
    items.push(grocery);
    localStorage.setItem('list',JSON.stringify(items));
}
function removeFromLocalStorage(id){
    let items = getLocalStorage();

    items = items.filter(function(item){
        if(item.id !== id){
            return item;
        }
    });
    localStorage.setItem('list',JSON.stringify(items));

}
function editLocalStorage(id,value){
    let items = getLocalStorage();
    items = items.map(function(item){
        if(item.id === id){
            item.value = value;
        }
        return item;
    });
    localStorage.setItem('list',JSON.stringify(items));
}
function getLocalStorage(){
  return  localStorage.getItem('list')?JSON.parse(localStorage.getItem('list')):[];
}
// localstorage API
// setItem
// getIem
// removeItem
// save as strings
// ************* SETUP ITEMS ***************
function setUpItems(){
    let items = getLocalStorage();
    if(items.length > 0){
        items.forEach(function(item){
            createListItems(item.id,item.value);
        })
    container.classList.add('show-container')
    }
}

function createListItems(id,value){
    const element = document.createElement('article');
        // add class
        element.classList.add('grocery-item');
        // add id
        const attr = document.createAttribute('data-id');
        attr.value = id;
        element.setAttributeNode(attr);
        element.innerHTML = `
        <p class="title">${value}</p>
        <div class="btn-container">
            <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
            </button>
            <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
            </button>
        </div>
        `;
        const deleteBtn = document.querySelector('.delete-btn');
        deleteBtn.addEventListener('click',deleteItem);
        const editBtn = document.querySelector('.edit-btn');
        editBtn.addEventListener('click',editItem);
        // append Child
        list.appendChild(element);
}
