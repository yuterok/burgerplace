let menu = document.getElementById('menu')

let cart = JSON.parse(localStorage.getItem("data")) || []

showPopular()

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
    generateCartItems()
    totalAmount()
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
    generateCartItems()
    totalAmount()
    localStorage.setItem("data", JSON.stringify(cart))
}

let deleteItem = (id) => {
    let search = cart.find((x)=> x.id === id);
    if(search === undefined) return
    else if (search.count === 0) return
    else{
        search.count = 0;
    }
    update(id)
    cart = cart.filter((x) => x.count !== 0)
    generateCartItems()
    totalAmount()
    localStorage.setItem("data", JSON.stringify(cart))
}
let update =(id)=> {
    let search = cart.find((x)=> x.id === id)
    document.getElementById(id).innerHTML = search.count
    generateCartItems()
}

let promo = document.querySelector('.promo');

function closeWindow(element){
    element.classList.add('closed');
}

// cart

let cartEl = document.getElementById('cart')

let orderSummaryEl = document.getElementById('order_summary')

let generateCartItems = () => {
    if(cart.length !==0){
        cartEl.innerHTML = cart.map((x) => {
            let {id, count} = x

            let search = menuItemsData.find((y) => y.id == id) || []
            let {img, name, price} = search
            return `
            <div class="order_details_product">
            <img src="${img}" alt="">
            <div class="order_details_text">
                <div class="order_details_title">
                    ${name}
                </div>
                <div class="order_details_quantity">
                    x${count}
                </div>
            </div>
            <div class="order_details_price">${price*count}₽</div>
            <div class="dish_buttons">
            <button onclick="decrement(${id})" class="dish_button minus">
                <i class="bi bi-dash"></i>
            </button>
            <button onclick="increment(${id})" class="dish_button plus">
                <i class="bi bi-plus"></i>
            </button>
            </div>
            <button onclick="deleteItem(${id})"><i class="bi bi-x dish_button close_button"></i></button>
            </div>
            `
        }).join('')

    }else{
        cartEl.innerHTML = `
        <div class="cart_empty_message"> Корзина пуста. <br> Скорее заказывайте нашу вкусную еду!</div>
        `
        orderSummaryEl.style.display = "none";
    }
}

generateCartItems()

let totalAmount = ()=>{
    if(cart.length !==0){
        let amount = cart.map((x)=>{
            let {id, count} = x
            let search = menuItemsData.find((y)=>y.id == id) || []
            return count * search.price;
        }).reduce((x,y)=>x+y, 0)
        console.log(amount)

        orderSummaryEl.style.display = 'block'
        orderSummaryEl.innerHTML = `
        <hr>
        <div class="service_tax">
            <div class="service_title">Сервисный сбор</div>
            <div class="service_price">100₽</div>
        </div>
        <div class="total">
            <div class="total_title">Итого</div>
            <div id='sum' class="total_price">${amount + 100}</div>
        </div>
        <button id="checkout_btn" class="checkout_btn" onclick="window.modalForm.showModal()" >Оформить заказ</button>
        `
    } else return
}
totalAmount()

// let modalForm = document.getElementById('modalForm')

// $(document).click(function (e) {
//     if ($(e.target).is(modalForm) {
//         modalForm.style.display = 'none'
//     }
// });

let modalForm = document.getElementById('modalForm')

$(document).click(function (e) {
    if ($(e.target).is('.modalForm')) {
        window.modalForm.close()
    }
});
function showModal() {
    $(".modalForm").fadeIn(300)
    $('body').css({'overflow': 'hidden'})
};
function closeModal() {
    $(".modalForm").fadeOut(300)
    $('body').css({'overflow': 'auto'})
    $('input[type=tel]').val('');
};