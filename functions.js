let itemsData = [];

async function loadItems() {
    try {
        const responds = await fetch('http://localhost:5000/items');
        itemsData = await responds.json();
        renderItems(itemsData);
        wishlistBtn();
    } catch (error) {
        console.error("error loading", error);
    }
}

//list

function renderItems(items) {
    const container = document.getElementById("items-list");
    container.innerHTML = "";

    items.forEach(item=> {
        const li = document.createElement("li");
        li.classList.add("items-li");

        li.innerHTML = `
            <div class="items-li-con">
                <div class="items-li-out">
                    <div class="items-li-out-img">
                        <img width="300" height="200" src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="items-li-outer">
                        <a class="items-li-outer-a" href=""></a>
                    </div>
            
                    <div class="items-li-like">
                        <div class="items-li-like-con">
                            <div class="items-li-like-out wishlist-btn" data-id="${item.id}">
                                <svg width="16" height="16" viewBox="0 0 512 512"><path xmlns="http://www.w3.org/2000/svg" fill="white" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path></svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="items-li-text">
                    <a class="items-li-text-a" href="">
                        <h2>${item.name}</h2>
                    </a>
                    <div class="items-li-text-out">
                        <div class="items-li-text-outer">
                            <span class="items-li-text-in"></span>
                        </div>
                    </div>
                    <span class="items-li-text-out2">
                        <del class="items-li-text-out2-del">
                            <span class="items-li-text-out2-del-span">₹</span>
                            ${item.original_price}
                        </del>
                        <ins class="items-li-text-out2-ins">
                            <span class="items-li-text-out2-ins-span">₹</span>
                            ${item.price}
                        </ins>
                    </span>
                </div>
            </div>
        `;

        container.appendChild(li);
    });
}

//sort

document.getElementById("sort-select").addEventListener("change", (e)=> {

    const value = e.target.value;
    let sorted = [...itemsData];

    if (value === "low-high") {
        sorted.sort((a,b)=> a.price - b.price);
    }else if (value === "high-low") {
        sorted.sort((a,b)=> b.price - a.price);
    }

    renderItems(sorted);
    wishlistBtn();
});


document.querySelectorAll(".price").forEach(blk => {
    const minRange = blk.querySelector(".min-range");
    const maxRange = blk.querySelector(".max-range");
    const minPrice = blk.querySelector(".min-price");
    const maxPrice = blk.querySelector(".max-price");

    function priceShow(val) {
        return '₹' + Number(val).toLocaleString();
    }

    function filterPrice() {
        const minVal = parseInt(minRange.value);
        const maxVal = parseInt(maxRange.value);

        minPrice.value = priceShow(minVal);
        maxPrice.value = priceShow(maxVal);

        const filterd = itemsData.filter(itm => {
            return itm.price >= minVal && itm.price <= maxVal;
        })

        renderItems(filterd);
    }

    [minRange, maxRange].forEach(input=> {
        input.addEventListener("input", ()=> {
            if (parseInt(minRange.value) > parseInt(maxRange.value)) {
                const temp = minRange.value;
                minRange.value = maxRange.value;
                maxRange.value = temp;
            }
            filterPrice();
        });
    });
});


//stock filter

const checkBoxs = document.querySelectorAll(".stock-filter");

checkBoxs.forEach(input => {
    input.addEventListener("change", () => {
        applyStockFilter();
    });
});

function applyStockFilter() {
    const values = Array.from(checkBoxs).filter(val => val.checked)
        .map(val => val.value);
    
    let filterdItems = itemsData;

    if(values.length > 0) {
        filterdItems = itemsData.filter(item => {
            if(values.includes("in") && item.stock === "in")
                return true;
            if(values.includes("out") && item.stock === "out")
                return true;
            return false;
        });
    }

    renderItems(filterdItems)
}


//wishlist

function  getWishlist() {
    return JSON.parse(localStorage.getItem("wishlist")) || [];
}

function saveWishlist(wishlist) {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

function wishlistBtn() {

    const btn = document.querySelectorAll(".wishlist-btn");
    const wishlist = getWishlist();

    btn.forEach(b=> {
        const id = b.dataset.id;

        b.classList.toggle("active",wishlist.includes(id));

        b.replaceWith(b.cloneNode(true));
    });

    const button = document.querySelectorAll(".wishlist-btn");

    button.forEach(btn=> {
        const id = btn.dataset.id;

        btn.addEventListener("click", () => {
            let current = getWishlist();

            if(current.includes(id)) {
                current = current.filter(itmId=> itmId !== id);
                btn.classList.remove("active");
            } else {
                current.push(id);
                btn.classList.add("active");
            }
            saveWishlist(current);
        });
    })
}

loadItems();