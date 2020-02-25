var text;
var moneyText;
var stockText;
var ashirtText;
var cottonText;
var autocottonText;
var shirtssoldText;

var Shirts = 0; //shirts made in total
var aShirts = 0; //How many auto shirts makers
var money = 0; //how many money the user has
var inventory = 0; //current levels of shirts to sell
var chence = 3;
var cottonbuyer = false; //automatic cotton buyer
var cotton = 20; //how much cotton is in stock
var shirtsSold = 0;

var autoTimer = 0;

window.addEventListener('load', startGame);

/**
 * This function loads the HTML element onto the screen
 * after the page has loaded
 */
function startGame(){
    text = document.getElementById('shirts');
    moneyText = document.getElementById('money');
    stockText = document.getElementById('stock');
    ashirtText = document.getElementById('ashirt');
    cottonText = document.getElementById('cotton')
    autocottonText = document.getElementById('autocottonstaus')
    shirtssoldText = document.getElementById('shirtsSold')

    window.setInterval(function(){update(); }, 1000/10); //update interval = 10th / second
}

/**
 * This function will make a shirt and require at least 1 cotton
 * @return function does not return a value
 */
function makeShirt(){
    if(cotton>=1){
        inventory+=1;
        Shirts+=1;
        cotton-=1;
    }
}

//buy 1 auto shirt makers
function autoShirt(){
    if(money>10){
        money-=10;
        aShirts+=1;
    }
}

//manually buy cotton
function buycotton(){
    if(money>=5){
        cotton+=10
        money-=5
    }
}

/**
 * This function buys a auto cotton buyes each time the element is clicked on
 * and require at least 20 momey
 */
function autocotton(){
    cottonbuyer = !cottonbuyer;

    if(cottonbuyer == true){
        document.getElementById('autobuyer').innerHTML = 'Cotton Buyer Enbled';
    }else{
        document.getElementById('autobuyer').innerHTML = 'Cotton Buyer Disenbled';
    }
}

/**
 * This function sells the shirt untill the value for the shirt fall to 0
 * adds an random value to the money value
 */
function sell(){
    var num = Math.floor(Math.random()*10)+1;

    if(num>chence){return}

    //cost of the shirt being sold
    if(inventory>=1){
        inventory-=1;
        var shirtcost = Math.random();
        shirtcost = (shirtcost-0.5);
        money+=(1 + shirtcost);
        shirtsSold+=1;
    }
}

//This function make shirts for each auto shirt maker you have
function autoShirtUpdate(){
    for(var i =0;i<aShirts;i++){
      makeShirt();  
    }
}

/**
 * Changes the visiblity of a html element to hidden
 * @param {*} buttonName - the id of the HTML element
 */
function removebutton(buttonName){
    document.getElementById(buttonName).style.display = "none"; 
} 

/**
 * Changes the visiblity of a html element to unhidden
 * @param {*} buttonName - the id of the HTML element
 */
function showbutton(buttonName){
    var x = document.getElementById(buttonName).style.display = "block";
} 

/**
 * This function hides the HTML element buyautocotton
 * and unhides the HTML element autobuyers
 */
function buyautocotton(){
    if(money>=20){
        money-=20
        removebutton("buyautocotton");
        showbutton("autobuyer");
    }else{
        showbutton("buyautocotton"); 
    }
}

function update(){ //10 times a second
    //evey 1 second
    autoTimer+=1;
    if(autoTimer>=10){
        autoTimer = 0;
        autoShirtUpdate(); //auto shirts for each auto shirt maker
    }

        /**
         * This function hides the HTML element autoMaker untill a value is meet
         * that unhides the HTML element
         */
        if(money<10){
           removebutton("autoMaker");
        }else{
           showbutton("autoMaker")
        }

        //buys cotton if the limit goes below a set limit
        if(cottonbuyer && cotton<10){
            buycotton();
        }
        
        //runs the functions each time this function is run
        sell();
        updatePage();
}

/**
 * This function updates the HTML element on the web page
 * does this 10 time each time the function update is run
 */
function updatePage(){
    text.innerHTML = 'Shirts Made: '+ Math.floor(Shirts);
    moneyText.innerHTML = "Money: £"+ money.toFixed(2);
    stockText.innerHTML = 'Auto Shirt Maker: '+ Math.floor(aShirts);
    autocottonText.innerHTML = 'Auto Cotton Buyer: '+ (cottonbuyer);
    cottonText.innerHTML = 'Cotton: '+ (cotton);
    shirtssoldText.innerHTML = 'Shirts Sold: '+ (shirtsSold);
}
