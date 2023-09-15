

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";
const appSettings = {
    databaseURL: "https://realtime-database-19688-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app);
const shoppingListDB = ref(database, "shoppingList");

const addBtnEl = document.getElementById('add-btn');
const inputFieldEl = document.getElementById('input-field');
const shoppingListEl = document.getElementById('shopping-list');
addBtnEl.addEventListener('click', function(){

    let inputValue = inputFieldEl.value.trim();
if(inputValue!==""){
    push(shoppingListDB, inputValue)

    clearInputFieldEl ();
}else{
    alert("Please enter a valid item before adding to the list.");
}


   
})


onValue(shoppingListDB, function(snapshot){

    if(snapshot.exists()){
        let shoppingListArray= Object.entries(snapshot.val());
        console.log(shoppingListArray)
        clearShoppingListEl ();
    
        for(let i = 0; i< shoppingListArray.length; i++){
            let currentShoppingList = shoppingListArray[i]
    
            appendItemShoppingListEl (currentShoppingList);
        }
    } else{
        shoppingListEl.innerHTML = "No items here...yet"
    }


})


function clearShoppingListEl (){
    shoppingListEl.innerHTML = ""; 
}

function appendItemShoppingListEl (item){

let itemID = item[0];
let itemValue = item[1];

let newEl = document.createElement("li");

newEl.textContent = itemValue;

shoppingListEl.append(newEl);

newEl.addEventListener("click", function(){

    let exactLocationOfDB = ref(database, `shoppingList/${itemID}`);
    remove(exactLocationOfDB);
})
}

function clearInputFieldEl (){
    inputFieldEl.value = "";
   
}