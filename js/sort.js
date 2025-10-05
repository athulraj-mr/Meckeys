let itemsData = [];

async function loadItems() {
    try {
        const responds = await fetch('http://localhost:5000/items');
        itemsData = await responds.json();
        renderItems(itemsData);
    } catch (error) {
        console.error("error loading", error);
    }
}

function renderItems(items) {
    const container = document.getElementById("items-list");
    container.innerHTML = "";

    items.forEach(item=> {
        const li = document.createElement("li");
        li.classList.add("items-li");

        li.innerHTML = `
            <li class="items-li">
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
                                <div class="items-li-like-out">
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
            </li>
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
});

loadItems();