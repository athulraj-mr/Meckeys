let itemsData = [];

//sort

const priceBar = document.querySelectorAll(".the class name");

function priceShow(val) {
    return Number(val).toLocaleString();
}

priceBar.forEach(bar=> {
    const minrange = bar.querySelector("class name");
    const maxRange = bar.querySelector("class name")
    const minprice = bar.querySelector("class name");
    const maxprice = bar.querySelector("class name");

    function updatetext() {
        if(parseInt(minrange.value) > parseInt(maxRange.value)) {
            const temp = minrange.value;
            minrange.value = maxRange.value;
            maxRange.value = temp;
        }
        minprice.value = priceShow(minrange.value);
        maxprice.value = priceShow(maxRange.value);
    }

    [minrange, maxRange].forEach(inp=> {
        inp.addEventListener("input", ()=> {
            updatetext();
        });
    });
});

let filteredItems = [...itemsData];
//price 
priceBar.forEach(bar=> {
    const minVal = parseInt(bar.querySelector("minrange").value);
    const maxVal = parseInt(bar.querySelector('maxRange').value);

    filteredItems = filteredItems.filter(itm=> itm.price >=minVal && itm.price <= maxVal);
});

//stock&rating
const stockbox = document.querySelectorAll("stock");
const ratingbox = document.querySelectorAll("rating");

[stockbox, ratingbox].forEach(box=> {
    box.addEventListener("change", applyFilters);
});

//stock
const selstock = Array.from(stockbox)
    .filter(itm=> itm.checked)
    .map(ip=> ip.value);
if(selstock.length > 0) {
    filteredItems = filteredItems.filter(itm=> selstock.includes(itm.stock));
};

//rating
const selrating = Array.from(ratingbox)
    .filter(i=> i.checked)
    .map(p=>parseInt(p.value));
if(selrating.length > 0) {
    const minval = Math.min(...selrating);
    filteredItems = filteredItems.filter(itm=> itm.rating >= minval);
}

//sort
const selsort = document.getElementById("sort");
selsort.addEventListener("change", applyFilters);

const sortvalue = selsort.value;
if(sortvalue === "low-high") {
    filteredItems.sort((a,b) =>a.price - b.price);
}else if(sortvalue === "high-low") {
    filteredItems.sort((a,b)=> b.price - a.price);
}

//reset 
document.querySelectorAll(".reset").forEach(btn => {
    btn.addEventListener("click", ()=>{
        const type = btn.dataset.reset;
        if(type === "price") {
            resetprice(btn);
        }else if(type === "stock") {
            resetstock();
        }else if(type === "rating") {
            resetrating();
        }
        applyFilters();;
    });
});

function resetprice(btn) {
    const container = btn.closest(".price");
    const minmaxrange = container.querySelector(".minmax class");
    const minmaxprice = container.querySelector("minmax class");

    minmaxrange.value = minrange.min;
    minmaxprice.value = priceShow(minmaxrange);
}

function resetstock() {
    stockbox.forEach(inp=> inp.checked = false);
}

function resetrating() {
    ratingbox.forEach(inp=> inp.checked = false);
}