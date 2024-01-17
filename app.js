let menu = document.getElementById('menu')

let cart = JSON.parse(localStorage.getItem("data")) || []


let menuItemsData = 
    [{id: "1",
    name: "Бургер Классика",
    price: "359",
    img: "img/menu/classic.png",
    category: "burger"},
    {id: "2",
    name: "Бургер BBQ",
    price: "329",
    img: "img/menu/bbq.png",
    category: "burger"},
    {id: "3",
    name: "Бургер Итальянский",
    price: "389",
    img: "img/menu/italian.png",
    category: "burger"},
    {id: "4",
    name: "Бургер Грибной",
    price: "389",
    img: "img/menu/mushroom.png",
    category: "burger"},
    {id: "5",
    name: "Пицца Пепперони",
    price: "599",
    img: "img/menu/pizza pepperoni.png",
    category: "pizza"},
    {id: "6",
    name: "Пицца BBQ",
    price: "599",
    img: "img/menu/pizza bbq.png",
    category: "pizza"},
    {id: "7",
    name: "Пицца Маргарита",
    price: "399",
    img: "img/menu/pizza margarita.png",
    category: "pizza"},
    {id: "8",
    name: "Пицца 4 сыра",
    price: "499",
    img: "img/menu/pizza cheese.png",
    category: "pizza"},
    {id: "9",
    name: "Чай Rich с манго",
    price: "99",
    img: "img/menu/tea rich mango.png",
    category: "drinks"},
    {id: "10",
    name: "Добрый Cola",
    price: "99",
    img: "img/menu/cola.png",
    category: "drinks"},
    {id: "11",
    name: "Чай Rich с лимоном",
    price: "99",
    img: "img/menu/tea rich lemon.png",
    category: "drinks"},
    {id: "12",
    name: "Добрый апельсин",
    price: "99",
    img: "img/menu/orange.png",
    category: "drinks"},
    {id: "13",
    name: "Куриные ножки",
    price: "249",
    img: "img/menu/fried legs.png",
    category: "chicken"},
    {id: "14",
    name: "Куриные крылышки",
    price: "249",
    img: "img/menu/fried wings.png",
    category: "chicken"},
    {id: "15",
    name: "Куриные стрипсы",
    price: "249",
    img: "img/menu/strips.png",
    category: "chicken"},
    {id: "16",
    name: "Куриные наггетсы",
    price: "249",
    img: "img/menu/nuggets.png",
    category: "chicken"},
    
]

function showDishes(array){
    menu.innerHTML = ''
    array.forEach(dish => {
        let search = cart.find((element) => element.id == dish.id) || []
        menu.innerHTML += `
        <div class="dish" id="dish-id-${dish.id}">
            <img src="${dish.img}" alt="">
            ${dish.name}
            <div class="dish_price">₽${dish.price}</div>
            <div class="dish_buttons">
                <button onclick="decrement(${dish.id})" class="dish_button minus">
                    <i class="bi bi-dash"></i>
                </button>
                <span id=${dish.id} class="dish_button quantity">
                ${search.count === undefined ? 0 : search.count}
                </span>
                <button onclick="increment(${dish.id})" class="dish_button plus">
                    <i class="bi bi-plus"></i>
                </button>
            </div>
        </div>
        `
    });
}

let categoryName = document.getElementById('cat-text')

function showPopular(){
    let cat = menuItemsData.filter(function (dish){
        return dish.id == "1" || dish.id == "13" || dish.id == "5" || dish.id == "10";
    })
    showDishes(cat);
}

showPopular()

// показать всё ▼ ▼ ▼
function showAllDishes(){
    showDishes(menuItemsData);
    categoryName.innerHTML = "Все блюда"
}

function showPizzas(){
    let cat = menuItemsData.filter(function (dish){
        return dish.category == "pizza";
    })
    showDishes(cat);
    categoryName.innerHTML = 'Пицца'
}

function showBurgers(){
    let cat = menuItemsData.filter(function (dish){
        return dish.category == "burger";
    })
    showDishes(cat);
    categoryName.innerHTML = 'Бургеры'
}

function showDrinks(){
    let cat = menuItemsData.filter(function (dish){
        return dish.category == "drinks";
    })
    showDishes(cat);
    categoryName.innerHTML = 'Напитки'
}

function showChicken(){
    let cat = menuItemsData.filter(function (dish){
        return dish.category == "chicken";
    })
    showDishes(cat);
    categoryName.innerHTML = 'Курица'
}

function showFish(){
    let cat = menuItemsData.filter(function (dish){
        return dish.category == "fish";
    })
    showDishes(cat);
    categoryName.innerHTML = 'Рыба'
}

function showBakery(){
    let cat = menuItemsData.filter(function (dish){
        return dish.category == "bakery";
    })
    showDishes(cat);
    categoryName.innerHTML = 'Выпечка'
}

// через map()

// let generateMenu =()=>{
//     return (menu.innerHTML= menuItemsData.map((x)=>{

//         let {id, name, price, img} = x;
//         return `
//         <div class="dish" id="dish-id-${id}">
//             <img src="${img}" alt="">
//             ${name}
//             <div class="dish_price">₽${price}</div>
//             <div class="dish_buttons">
//                 <button onclick="decrement(${id})" class="dish_button minus">
//                     <i class="bi bi-dash"></i>
//                 </button>
//                 <span id=${id} class="dish_button quantity">0</span>
//                 <button onclick="increment(${id})" class="dish_button plus">
//                     <i class="bi bi-plus"></i>
//                 </button>
//             </div>
//         </div>
//         `
//     }).join(""));
// }
// generateMenu()

let increment = (id) => {
    let search = cart.find((x)=> x.id === id);
    if (search === undefined){
        cart.push({
            id: id,
            count: 1
        })
    }else{
        search.count +=1;
    }
    update(id)
    localStorage.setItem("data", JSON.stringify(cart))
}

let decrement = (id) => {
    let search = cart.find((x)=> x.id === id);
    if(search === undefined) return
    else if (search.count === 0) return
    else{
        search.count -=1;
    }
    
    update(id)
    cart = cart.filter((x) => x.count !== 0)
    localStorage.setItem("data", JSON.stringify(cart))
}


let cartEl = document.getElementById('cart')

let update =(id)=> {
    let search = cart.find((x)=> x.id === id)
    document.getElementById(id).innerHTML = search.count
}

let promo = document.querySelector('.promo');

function closeWindow(element){
    element.classList.add('closed');
}