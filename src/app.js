let menu = document.getElementById('menu')

let cart = JSON.parse(localStorage.getItem("data")) || []
let address = JSON.parse(localStorage.getItem("address")) || 'ул. Бассейная, 32'
let userName = JSON.parse(localStorage.getItem("userName")) || 'Новый пользователь'
let promocode = 'FIRSTBURGER'

let welcomeMessage = document.getElementById('hello-el')
welcomeMessage.innerHTML = `Добрый день, ${userName}`

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
    console.log(cart)
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
    console.log(cart)
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
    totalAmount()
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

        orderSummaryEl.style.display = 'block'
        orderSummaryEl.innerHTML = `
        <hr>
        <div class="service_tax">
            <div class="service_title">Сервисный сбор</div>
            <div class="service_price">100₽</div>
        </div>
        <div class="total">
            <div class="total_title">Итого</div>
            <div id='sum' class="total_price">${amount + 100} ₽</div>
        </div>
        <button id="checkoutBtn" class="checkout_btn" onclick="modalFormShow()">Оформить заказ</button>
        `
        return amount + 100
    } else return
}
totalAmount()

let modalForm = document.getElementById('modalForm')
let confirmAddressBtn = document.getElementById('confirmAddressBtn')
let confirmUserNameBtn = document.getElementById('confirmUserNameBtn')
let addressBlock = document.getElementById('addressBlock')


addressBlock.innerHTML = `
    <div class="address_text">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M20.46 9.63C20.3196 8.16892 19.8032 6.76909 18.9612 5.56682C18.1191 4.36456 16.9801 3.40083 15.655 2.7695C14.3299 2.13816 12.8639 1.86072 11.3997 1.96421C9.93555 2.06769 8.52314 2.54856 7.3 3.36C6.2492 4.06265 5.36706 4.9893 4.71695 6.07339C4.06684 7.15749 3.6649 8.37211 3.54 9.63C3.41749 10.8797 3.57468 12.1409 4.00017 13.3223C4.42567 14.5036 5.1088 15.5755 6 16.46L11.3 21.77C11.393 21.8637 11.5036 21.9381 11.6254 21.9889C11.7473 22.0397 11.878 22.0658 12.01 22.0658C12.142 22.0658 12.2727 22.0397 12.3946 21.9889C12.5164 21.9381 12.627 21.8637 12.72 21.77L18 16.46C18.8912 15.5755 19.5743 14.5036 19.9998 13.3223C20.4253 12.1409 20.5825 10.8797 20.46 9.63ZM16.6 15.05L12 19.65L7.4 15.05C6.72209 14.3721 6.20281 13.5523 5.87947 12.6498C5.55614 11.7472 5.43679 10.7842 5.53 9.83C5.62382 8.86111 5.93177 7.92516 6.43157 7.08985C6.93138 6.25453 7.61056 5.54071 8.42 5C9.48095 4.29524 10.7263 3.9193 12 3.9193C13.2737 3.9193 14.5191 4.29524 15.58 5C16.387 5.53862 17.0647 6.24928 17.5644 7.08094C18.064 7.9126 18.3733 8.84461 18.47 9.81C18.5663 10.7674 18.4484 11.7343 18.125 12.6406C17.8016 13.5468 17.2807 14.3698 16.6 15.05ZM12 6C11.11 6 10.24 6.26392 9.49994 6.75839C8.75992 7.25286 8.18314 7.95566 7.84255 8.77793C7.50195 9.6002 7.41284 10.505 7.58647 11.3779C7.7601 12.2508 8.18869 13.0526 8.81802 13.682C9.44736 14.3113 10.2492 14.7399 11.1221 14.9135C11.995 15.0872 12.8998 14.9981 13.7221 14.6575C14.5443 14.3169 15.2471 13.7401 15.7416 13.0001C16.2361 12.26 16.5 11.39 16.5 10.5C16.4974 9.30734 16.0224 8.16428 15.1791 7.32094C14.3357 6.4776 13.1927 6.00265 12 6ZM12 13C11.5055 13 11.0222 12.8534 10.6111 12.5787C10.2 12.304 9.87952 11.9135 9.6903 11.4567C9.50109 10.9999 9.45158 10.4972 9.54804 10.0123C9.6445 9.52733 9.88261 9.08187 10.2322 8.73224C10.5819 8.38261 11.0273 8.1445 11.5123 8.04804C11.9972 7.95158 12.4999 8.00109 12.9567 8.1903C13.4135 8.37952 13.804 8.69996 14.0787 9.11108C14.3534 9.5222 14.5 10.0056 14.5 10.5C14.5 11.163 14.2366 11.7989 13.7678 12.2678C13.2989 12.7366 12.663 13 12 13Z" fill="#F8B602"/>
    </svg>
    ${address}
    </div>
    <button id="changeAddressBtn" class="address_change_btn" onclick="window.changeAddressModal.showModal()">Изменить</button>`

confirmAddressBtn.addEventListener('click', function (){
    let addressNew = document.getElementById('address').value
    localStorage.setItem("address", JSON.stringify(addressNew))
})

confirmUserNameBtn.addEventListener('click', function (){
    let userNameNew = document.getElementById('userName').value
    localStorage.setItem("userName", JSON.stringify(userNameNew))
})

let checkoutBtn = document.getElementById('checkoutBtn')

function finalCheckout(){
    alert('Заказ успешно создан')
    cart = []
    generateCartItems()
    localStorage.setItem("data", JSON.stringify(cart))
}

let modalFormUpdate = ()=>{
    modalForm.innerHTML = `
    <button id="close-form-btn" onclick="window.modalForm.close();"><i class="bi bi-x"></i></button>
            <h2>Оформление заказа</h2>
            <form id="myForm" onsubmit="finalCheckout()">
                Имя
                <input type="text" placeholder="Иван" required>
                Номер телефона:
                <input type="tel" maxlength="14" placeholder="+7(___)___-__-__" pattern="^\+7[1-9]{10}$" title="Используйте формат: +7 (777) 777-77-77" required>
                Выберите способ получения заказа:
                <div class="radioBlock">
                    <input class="radio" type="radio" name="color" value="Доставка"> Доставка
                    <input class="radio" type="radio" name="color" value="Самовывоз"> Самовывоз
                </div>
                Количество приборов:
                <input type="number" value="1" min="0">
                Промокод
                <div class="promocodeBlock">
                    <input class="promocode_box"type="text" name="userPromocode" maxlength="20" placeholder="">
                    <button id="promocode_btn" class="promocode_btn" onclick="checkPromocode(userPromocode.value)">Ввести</button>
                </div>
                Комментарий к заказу:
                <input type="text" name="comment" maxlength="2000" placeholder="">
                <div id="finalAmount"><h3 id="finalAmount">К оплате: ${totalAmount()} рублей </h3></div>
                <input id="finalCheckoutBtn" class="checkout_btn" type="submit" value="Оформить заказ">
            </form>
    `
    let promocodeBtn = document.getElementById('promocode_btn')

    promocodeBtn.addEventListener('click', function(event){
        event.preventDefault()
    })
}

function modalFormShow(){
    modalFormUpdate()
    window.modalForm.showModal()
}

modalFormUpdate()

let checkPromocode = (promo)=>{
    let finalAmount = document.getElementById('finalAmount')
    if (promo == promocode){
        let resultAmount = Math.round(totalAmount() * 0.8)
        finalAmount.innerHTML = `<h3>К оплате: ${resultAmount} рублей </h3>
        <p>Скидка: ${Math.round(totalAmount() - resultAmount)} рублей </p>`
    } else {
        alert('Данного промокода не существует')
    }
}

