const form = document.querySelector('form');
const txtI = document.querySelector('#txtI');
const txtF = document.querySelector('#txtF');
const list = document.querySelector('ul');
const btnC = document.querySelector('#btnC');


//Load all event listener
loadeventlisteners();

function loadeventlisteners(){

    form.addEventListener('submit',addTask);
    list.addEventListener('click',removeTask);
    btnC.addEventListener('click',clearTask);
    txtF.addEventListener('keyup',filtertask);
}

function addTask(r){
    if(txtI.value === ''){
        alert('برای افزودن تسک ابتدا تسک را وارد کنید');
    }
    else{
        //create li element
        const li = document.createElement('li');
        //Add class
        li.className = 'list-group-item';
        //create text node and append to li
        li.appendChild(document.createTextNode(txtI.value));
        //create i
        const icon = document.createElement('i'); 
        icon.className = 'fa fa-remove del';

        //Append li & icon to ul
        li.appendChild(icon);

        list.appendChild(li);
        
        addlocal(txtI.value);
        txtI.value = '';

        // r.preventDefault();
    }
}

function addlocal(task){
     let tasks;
     if(localStorage.getItem('tasks') === null){
        tasks = [];
     }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
     }
     tasks.push(task);
         localStorage.setItem('tasks',JSON.stringify(tasks));

}



function removeTask(c){
    if(c.target.classList.contains('del')){
        if(confirm('آیا مطمعن هستی برای حذف تسک')){
            c.target.parentElement.remove();
        }
    }
}

function clearTask(){
    list.innerHTML = '';
}

function filtertask(e){
    const text = e.target.value.toLowerCase();
    
    document.querySelectorAll('.list-group-item').forEach(function(task) {

        const item = task.textContent;
        console.log(item);
    if(item.toLowerCase().indexOf(text) != -1){
        task.classList.add(task.style.display = 'block');
    }else{
        task.classList.remove(task.style.display = 'block');
        task.style.display = 'none';
    }
    });    
}