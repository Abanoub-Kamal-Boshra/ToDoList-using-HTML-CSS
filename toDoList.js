class ToDoList {
    constructor(key , toDo){
        this.key = key;
        this.toDo = toDo;
    }
}

let list = [];
let completedList = [];
let myToDoInput = document.getElementById("_toDoInput");
let myWantedList = document.getElementById("_wantedList");
let myCompletedList = document.getElementById("_completedList");

if(localStorage.length == 0)
{
    var elementKey = 0;
}
elementKey = localStorage.getItem("element_Key");
let elementRenewFlag = 0;
let elementIndix = 0;
let keyName=0, i=0;
myWantedList.innerHTML = "";
myCompletedList.innerHTML = "";
for (i = 0; i < localStorage.length; i++) 
{
    // return the key name
    keyName = localStorage.key(i);
    console.log(keyName);
    if(keyName == "wantedToDoList")
    {
        elementRenewFlag = 1;
        list = JSON.parse(localStorage.getItem(keyName));
        for(let j=0; j<list.length; j++)
        {
            myWantedList.innerHTML += "<li class='_listRow'> <span>"+list[j].toDo+"</span>"+
                                    "<button value="+list[j].key+" class='_myToDoItemDel' onclick='deleteElement(this)'>x</button>"+
                                    "<input type='checkbox' id="+list[j].key+" class='_myToDoItemCom' onchange='completeElement(this)'>"+
                                    " </li>";
        }
    }
    if(keyName == "completedToDoList")
    {
        elementRenewFlag = 1;
        completedList = JSON.parse(localStorage.getItem(keyName));
        for(let j=0; j<completedList.length; j++)
        {
            myCompletedList.innerHTML += "<li class='_listRow'> <span>"+completedList[j].toDo+"</span>"+
                                    "<button value="+completedList[j].key+" class='_myToDoItemDel' onclick='deleteElement(this)'>x</button>"+
                                    "<input type='checkbox' id="+completedList[j].key+" class='_myToDoItemCom' onchange='completeElement(this)' checked>"+
                                    " </li>";
        }
    }
}
if(elementRenewFlag == 0)
{
    elementKey = 0;
}

// when press on the button add (+)
function addToDoList(){
    let newToDoList = new ToDoList(elementKey , myToDoInput.value );

    list.push(newToDoList);
    myWantedList.innerHTML += "<li class='_listRow'> <span>"+myToDoInput.value+"</span>"+
                                    "<button value="+elementKey+" class='_myToDoItemDel' onclick='deleteElement(this)'>x</button>"+
                                    "<input type='checkbox' id="+elementKey+" class='_myToDoItemCom' onchange='completeElement(this)'>"+
                            " </li>";
    elementKey++;
    localStorage.setItem( "wantedToDoList" , JSON.stringify(list) );
    localStorage.setItem("element_Key", elementKey);
    myToDoInput.value = "";

    console.log(list)
    console.log(completedList)
    console.log(elementKey)
}

function deleteElement(element)
{
    // delete the element from the wanted to do list
    list = list.filter(checkKey);
    function checkKey(val)
    {
        return val.key != element.value;
    }
    // delete if the element in the completed list
    completedList = completedList.filter(checkKey);
    function checkKey(val)
    {
        return val.key != element.value;
    }
    console.log(list)
    console.log(completedList)
    console.log(element.value)
    // remove the element from the showing list for the user
    element.parentNode.remove();
    // add elements of completed list in the localStorage
    localStorage.setItem( "completedToDoList" , JSON.stringify(completedList) );
    // add elements of uncompleted list in the localStorage
    localStorage.setItem( "wantedToDoList" , JSON.stringify(list) );
    localStorage.setItem("element_Key", elementKey);
}


function completeElement(chickBox)
{
    if(chickBox.checked)
    {
        // get the indix of the element that is checked
        list.forEach(getMyIndex);
        function getMyIndex(val, index, array)
        {
            if(array[index].key == chickBox.id)
            {
                elementIndix = index;
            }
        }
        // add the element to the completed list
        completedList.push(list[elementIndix]);
        // delete the element from the wanted to do list
        list = list.filter(checkKey);
        function checkKey(val)
        {
            return val.key != chickBox.id;
        }
        // show the element in the completed list in the html list
        myCompletedList.appendChild(chickBox.parentNode);
        // add elements of completed list in the localStorage
        localStorage.setItem( "completedToDoList" , JSON.stringify(completedList) );
        // add elements of uncompleted list in the localStorage
        localStorage.setItem( "wantedToDoList" , JSON.stringify(list) );

        localStorage.setItem("element_Key", elementKey);
    }
    else
    {
        // get the indix of the element that is unchecked
        completedList.forEach(getMyIndex);
        function getMyIndex(val, index, array)
        {
            if(array[index].key == chickBox.id)
            {
                elementIndix = index;
            }
        }
        // add the element to the uncompleted list
        list.push(completedList[elementIndix]);
        // delete the element from the completed list
        completedList = completedList.filter(checkKey);
        function checkKey(val)
        {
            return val.key != chickBox.id;
        }
        // show the element in the uncompleted list in the html list
        myWantedList.appendChild(chickBox.parentNode);
        // add elements of completed list in the localStorage
        localStorage.setItem( "completedToDoList" , JSON.stringify(completedList) );
        // localStorage.removeItem(element.value);
        localStorage.setItem( "wantedToDoList" , JSON.stringify(list) );
        localStorage.setItem("element_Key", elementKey);
    }
}