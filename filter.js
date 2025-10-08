const minRange = document.getElementById("min-range");
const maxRange = document.getElementById("max-range");
const minPrice = document.getElementById("min-price");
const maxPrice = document.getElementById("max-price");

//display price
function priceShow(val) {
    return '₹' + Number(val).toLocaleString();
}

//filter
function filterPrice() {
    const minVal = parseInt(minRange.value);
    const maxVal = parseInt(maxRange.value);
    minPrice.value = priceShow(minVal);
    maxPrice.value = priceShow(maxVal);

    const filtered = itemsData.filter(itm=> {
        return itm.price >= minVal && itm.price <= maxVal;
    });

    renderItems(filtered);
    wishlistBtn();
}

[minRange, maxRange].forEach(input=> {
    input.addEventListener("input", () => {
        if(parseInt(minRange.value) > parseInt(maxRange.value)) {
            const temp = minRange.value;
            minRange.value = maxRange.value;
            maxRange.value = temp;
        }
        filterPrice();
    });
});
