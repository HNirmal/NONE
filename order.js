document.addEventListener('DOMContentLoaded', () => {
    const groceryItems = {
        fruits: [
            { name: 'Apple (500g)', price: 580 },
            { name: 'Banana (500g)', price: 450 },
            { name: 'Orange (500g)', price: 740 },
            { name: 'Strawberry (250g)', price: 540 },
            { name: 'Grapes (300g)', price: 620 },
            { name: 'Pineapple (1Kg)', price: 740 }
        ],
        vegetables: [
            { name: 'Brinjals (300g)', price: 330 },
            { name: 'Beetroot (200g)', price: 390 },
            { name: 'Big Onions (250g)', price: 420 },
            { name: 'Capsicum (100g)', price: 230 },
            { name: 'Red Cabbage (300g)', price: 690 },
            { name: 'Raddish (300g)', price: 480 }
        ],
        dairy: [
            { name: 'Ambewela Milk (1L)', price: 550 },
            { name: 'Cheese (120g)', price: 1220 },
            { name: 'Yoghurt (80ml)', price: 80 },
            { name: 'Butter (227g)', price: 1300 },
            { name: 'Whipping Cream', price: 4100 },
            { name: 'Magic Vanilla (1L)', price: 416 }
        ],
        meatSeafood: [
            { name: 'Beef Cubes', price: 3130 },
            { name: 'Prawns (500g)', price: 3660 },
            { name: 'Chicken (500g)', price: 1250 },
            { name: 'CuttleFish (500g)', price: 1570 },
            { name: 'Pork Cubes', price: 2590 },
            { name: 'Crab Meat (500g)', price: 6375 }
        ],
        bakingCooking: [
            { name: 'Wheat Flour (1Kg)', price: 250 },
            { name: 'Brown Sugar (1Kg)', price: 595 },
            { name: 'Crystal Salt (1Kg)', price: 135 },
            { name: 'Olive Oil (250ml)', price: 1990 },
            { name: 'Dill Seeds (100g)', price: 92 },
            { name: 'Vinegar (750ml)', price: 380 }
        ],
        cosmeticsProducts: [
            { name: 'Forever Special Foot Crack Cream (100ml)', price: 450 },
            { name: 'Baby Cheramy Regular Oil (100ml)', price: 450 },
            { name: 'Clear Men Menthol Shampoo (80ml)', price: 490 },
            { name: 'Dettol Antibacterial Soap Cool (100g)', price: 185 },
            { name: 'Ayush Anti-Cavity Toothpaste (110g)', price: 285 },
            { name: 'Vaseline Int.Care Deep Restore (100ml)', price: 425 }
        ]
    };

    const sections = {
        fruits: document.getElementById('fruits-list'),
        vegetables: document.getElementById('vegetables-list'),
        dairy: document.getElementById('dairy-list'),
        meatSeafood: document.getElementById('meat-seafood-list'),
        bakingCooking: document.getElementById('baking-cooking-list'),
        cosmeticsProducts: document.getElementById("skincare-products-list")
    };

    const orderTableBody = document.querySelector('#order-table tbody');
    const totalPriceElement = document.getElementById('total-price');
    const buyNowButton = document.getElementById('buy-now');
    const addToFavouritesButton = document.getElementById('add-to-favourites');
    const applyFavouritesButton = document.getElementById('apply-favourites');

    let orderItems = [];

    function addItemToOrder(item, quantity, price) {
        const orderItem = { item, quantity, price: price * quantity };
        orderItems.push(orderItem);
        renderOrderTable();
    }

    function renderOrderTable() {
        orderTableBody.innerHTML = '';
        let total = 0;
        orderItems.forEach(({ item, quantity, price }) => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${item}</td><td>${quantity}</td><td>Rs : ${price.toFixed(2)}</td>`;
            orderTableBody.appendChild(row);
            total += price;
        });
        totalPriceElement.textContent = total.toFixed(2);
    }

    function createListItems(section, items) {
        items.forEach(({ name, price }) => {
            const listItem = document.createElement('li');
            const label = document.createElement('label');
            const input = document.createElement('input');
            input.type = section === 'dairy' || section === 'bakingCooking' ? 'number' : 'number';
            input.min = 1;
            input.value = 1;
            label.textContent = `${name} - Rs: ${price}`;
            label.appendChild(input);
            listItem.appendChild(label);

            const button = document.createElement('button');
            button.textContent = 'Add to Cart';
            button.addEventListener('click', () => {
                addItemToOrder(name, parseFloat(input.value), price);
            });
            listItem.appendChild(button);
            sections[section].appendChild(listItem);
        });
    }

    Object.keys(groceryItems).forEach(section => {
        createListItems(section, groceryItems[section]);
    });

    buyNowButton.addEventListener('click', () => {
        localStorage.setItem('orderItems', JSON.stringify(orderItems));
        window.location.href = 'checkout.html';
    });

    addToFavouritesButton.addEventListener('click', () => {
        localStorage.setItem('favouriteOrder', JSON.stringify(orderItems));
        const favouriteApply = JSON.parse(localStorage.getItem('favouriteApply'));
        alert('Added to Favourites.');
        if (favouriteApply) {
            orderItems = favouriteApply;
            renderOrderTable();
        }});

    applyFavouritesButton.addEventListener('click', () => {
        const favouriteOrder = JSON.parse(localStorage.getItem('favouriteOrder'));
        if (favouriteOrder) {
            orderItems = favouriteOrder;
            renderOrderTable();
            alert('Favourites Applied.');
        } else {
            alert('No favourite order found.');
        }
    });
});
