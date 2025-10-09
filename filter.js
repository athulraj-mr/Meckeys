let classObj = {
  name: "class A",
  teacherName: "Mary",
  students: [
    {
      name: "Ravi",
      id: "101",
      marks: [
        { subject: "English", mark: 25 },
        { subject: "Maths", mark: 48 },
        { subject: "Physics", mark: 40 },
        { subject: "Chemistry", mark: 30 },
        { subject: "Computer", mark: 20 },
      ],
    },
    {
      name: "Aju",
      id: "102",
      marks: [
        { subject: "English", mark: 35 },
        { subject: "Maths", mark: 38 },
        { subject: "Physics", mark: 33 },
        { subject: "Chemistry", mark: 34 },
        { subject: "Computer", mark: 30 },
      ],
    },
    {
      name: "Binu",
      id: "104",
      marks: [
        { subject: "English", mark: 49 },
        { subject: "Maths", mark: 49 },
        { subject: "Physics", mark: 47 },
        { subject: "Chemistry", mark: 46 },
        { subject: "Computer", mark: 50 },
      ],
    },
  ],
};


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

//price filter
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


//stock-rating filter

const stockCheckBoxes = document.querySelectorAll(".stock-filter");
const ratingCheckBoxes = document.querySelectorAll(".rating-filter");

[...stockCheckBoxes, ...ratingCheckBoxes].forEach(input => {
    input.addEventListener("change", applyFilters);
});


function applyFilters() {
    let filteredItems = itemsData;

    //stock
    const selectedStock = Array.from(stockCheckBoxes)
        .filter(input => input.checked)
        .map(input => input.value);

    if (selectedStock.length > 0) {
        filteredItems = filteredItems.filter(itm => selectedStock.includes(itm.stock));
    }

    //rating
    const selectedRatings = Array.from(ratingCheckBoxes)
        .filter(inp => inp.checked)
        .map(i => parseInt(i.value));

    if (selectedRatings.length > 0) {
        filteredItems = filteredItems.filter(itm => selectedRatings.includes(itm.rating));
    }

    renderItems(filteredItems);

}