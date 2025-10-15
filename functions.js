let itemsData = [];

async function loadItems() {
    try {
        const responds = await fetch('./db.json');
        const data = await responds.json();
        itemsData = data.items;
        filteredItemsStore = [...itemsData];
        renderScrollItems();
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

        //rating
        const ratingInner = li.querySelector(".items-li-text-in");
        if(item.rating !== undefined) {
            const width = (item.rating / 5) * 100;
            ratingInner.style.width = `${width - 0.3}%`;
        } else {
            ratingInner.style.width = "0%";
        }

    });
}

const priceBar = document.querySelectorAll(".price");

function priceShow(val) {
    return '₹' + Number(val).toLocaleString();
}

//stock&rating

const stockCheckBoxes = document.querySelectorAll(".stock-filter");
const ratingCheckBoxes = document.querySelectorAll(".rating-filter");

[...stockCheckBoxes, ...ratingCheckBoxes].forEach(inp => {
    inp.addEventListener("change", applyFilters);
});


//sort
const sortSelect = document.getElementById("sort-select");
sortSelect.addEventListener("change", applyFilters);

//main filter
function applyFilters() {

    let filteredItems = [...itemsData];

    //price filter
    priceBar.forEach(bar => {
        const minVal = parseInt(bar.querySelector(".min-range").value);
        const maxVal = parseInt(bar.querySelector(".max-range").value);
        filteredItems = filteredItems.filter(itm => itm.price >= minVal && itm.price <= maxVal);
    });

    //stock filter
    const selectedStock = Array.from(stockCheckBoxes)
        .filter(input => input.checked)
        .map(input => input.value);
    
    if(selectedStock.length > 0) {
        filteredItems = filteredItems.filter(itm => selectedStock.includes(itm.stock));
    }

    //rating filter
    const selectedRatings = Array.from(ratingCheckBoxes)
        .filter(input => input.checked)
        .map(input => parseInt(input.value));

    if(selectedRatings.length > 0) {
        const minRating = Math.min(...selectedRatings);
        filteredItems = filteredItems.filter(itm => itm.rating >= minRating);
    }

    //sort min-max
    const sortValue = sortSelect.value;
    if(sortValue === "low-high") {
        filteredItems.sort((a,b) => a.price - b.price);
    } else if(sortValue === "high-low") {
        filteredItems.sort((a,b) => b.price - a.price);
    } else if(sortValue === "latest") {
        filteredItems.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }

    filteredItemsStore = filteredItems;
    currentPage = 1;

    renderScrollItems();
    wishlistBtn();

}

//reset
document.querySelectorAll(".reset-btn").forEach(btn => {
    btn.addEventListener("click", ()=> {
        const type = btn.dataset.reset;

        if(type === "price") {
            resetPriceFilter(btn);
        }else if (type === "stock") {
            resetStockFilter();
        }else if (type === "rating") {
            resetRatingFilter();
        }

        applyFilters();
    });
});

//price-reset
function resetPriceFilter(btn) {
    const container = btn.closest(".price");

    const minRange = container.querySelector(".min-range");
    const maxRange = container.querySelector(".max-range");
    const minPrice = container.querySelector(".min-price");
    const maxPrice = container.querySelector(".max-price");

    minRange.value = minRange.min;
    maxRange.value = maxRange.max;
    minPrice.value = priceShow(minRange.min);
    maxPrice.value = priceShow(maxRange.max);

    updatePriceBar(container);
    togglePriceResetVisibility(container);
    applyFilters();
}

//stock-reset
document.querySelectorAll(".stock, .s-stock").forEach(container => {
    const checkboxes = container.querySelectorAll(".stock-filter");
    checkboxes.forEach(cb => {
        cb.addEventListener("change", () => toggleStockReset(container));
    });
});

function resetStockFilter() {
    document.querySelectorAll(".stock, .s-stock").forEach(container => {
        container.querySelectorAll(".stock-filter").forEach(cb => cb.checked = false);
        const resetBtn = container.querySelector(".stock-reset-btn3, .side-bar-dot");
        if (resetBtn) resetBtn.classList.remove("active");
    });
}

function toggleStockReset(container) {
    const checkboxes = container.querySelectorAll(".stock-filter");
    const resetBtn = container.querySelector(".stock-reset-btn3, .side-bar-dot");
    if (!resetBtn) return;

    const anyChecked = Array.from(checkboxes).some(cb => cb.checked);
    resetBtn.classList.toggle("active", anyChecked);
}

//rating-reset
document.querySelectorAll(".rating-filter").forEach(cb => {
    cb.addEventListener("change", toggleRatingReset);
});

function resetRatingFilter() {
    const ratingCheckBoxes = document.querySelectorAll(".rating-filter");
    ratingCheckBoxes.forEach(cb => cb.checked = false);

    document.querySelectorAll(".rating-star-dot, .s-rating-line").forEach(btn => {
        btn.classList.remove("active");
    });
}

function toggleRatingReset() {
    const ratingCheckBoxes = document.querySelectorAll(".rating-filter");
    const anyChecked = Array.from(ratingCheckBoxes).some(cb => cb.checked);

    document.querySelectorAll(".rating-star-dot, .s-rating-line").forEach(btn => {
        btn.classList.toggle("active", anyChecked);
    });
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

//scroll

 let currentPage = 1;
 const itemPerPage = 18;
 let filteredItemsStore = [];
 let isLoading = false;

 function renderScrollItems() {
    const start = (currentPage - 1) * itemPerPage;
    const end = currentPage * itemPerPage;
    const itemsToRender = filteredItemsStore.slice(0, end);

    renderItems(itemsToRender);
    wishlistBtn();
 }

 window.addEventListener("scroll", () => {
    if(isLoading) return;

    const scrollPos = window.innerHeight + window.scrollY;
    const pageHeight = document.documentElement.offsetHeight;
    const threshold = window.innerHeight * 0.5;

    if(scrollPos >= pageHeight - threshold) {
        loadMoreItems();
    }
 });

 function loadMoreItems() {
    if(currentPage * itemPerPage >= filteredItemsStore.length) return;
    isLoading = true;
    currentPage++;
    
    renderScrollItems();
    isLoading = false;
 }


//pricebar-color
function updatePriceBar(container) {

    const minRange = container.querySelector(".min-range");
    const maxRange = container.querySelector(".max-range");
    const bar = container.querySelector(".active-bar");

    if(!minRange || !maxRange || !bar) return;
    
    const min = parseInt(minRange.value);
    const max = parseInt(maxRange.value);
    const rangeMin = parseInt(minRange.min);
    const rangeMax = parseInt(maxRange.max);

    const leftPercent = ((min-rangeMin) / (rangeMax - rangeMin)) * 100;
    const rightPercent = ((max-rangeMin) / (rangeMax - rangeMin)) * 100;

    bar.style.background = `
        linear-gradient(to right,
            #968a8aff 0%,
            #968a8aff ${leftPercent}%,
            #111 ${leftPercent}%,
            #111 ${rightPercent}%,
            #968a8aff ${rightPercent}%,
            #968a8aff 100%
        )
    `;
};

//priceBar visibility
function togglePriceResetVisibility(container) {
    const minRange = container.querySelector(".min-range");
    const maxRange = container.querySelector(".max-range");
    const resetDiv = container.querySelector(".reset-btn3");

    if (!minRange || !maxRange || !resetDiv) return;

    const isChanged =
        parseInt(minRange.value) !== parseInt(minRange.min) ||
        parseInt(maxRange.value) !== parseInt(maxRange.max);

    resetDiv.classList.toggle("active", isChanged);
}

document.querySelectorAll(".price").forEach(container => {
    const minRange = container.querySelector(".min-range");
    const maxRange = container.querySelector(".max-range");
    const minPrice = container.querySelector(".min-price");
    const maxPrice = container.querySelector(".max-price");
    const resetBtn = container.querySelector(".reset-btn[data-reset='price']");

    if (!minRange || !maxRange || !minPrice || !maxPrice) return;

    // Update text inputs
    const onInputChange = () => {
        if (parseInt(minRange.value) > parseInt(maxRange.value)) minRange.value = maxRange.value;
        if (parseInt(maxRange.value) < parseInt(minRange.value)) maxRange.value = minRange.value;

        minPrice.value = priceShow(minRange.value);
        maxPrice.value = priceShow(maxRange.value);

        updatePriceBar(container);
        togglePriceResetVisibility(container);
        applyFilters();
    };

    minRange.addEventListener("input", onInputChange);
    maxRange.addEventListener("input", onInputChange);

    // Reset
    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            resetPriceFilter(resetBtn);
        });
    }

    minPrice.value = priceShow(minRange.value);
    maxPrice.value = priceShow(maxRange.value);
    updatePriceBar(container);
    togglePriceResetVisibility(container);
    
});