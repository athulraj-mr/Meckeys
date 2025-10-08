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

    renderItems(filterdItems);
}

//rating filter

const rating_checkBoxs = document.querySelectorAll(".rating-filter");

rating_checkBoxs.forEach(input => {
    input.addEventListener("change", () => {
        applyRatingFilter();
    });
});

function applyRatingFilter() {
    const values = Array.from(rating_checkBoxs)
        .filter(input => input.checked)
        .map(input => parseFloat(input.value));
    
    let filterdItems = itemsData;

    if(values.length > 0) {
        const minRating = Math.max(...values);

        filterdItems = itemsData.filter(itm => itm.rating >= minRating);
    }

    renderItems(filterdItems);
}

    