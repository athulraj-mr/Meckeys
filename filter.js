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


function lowest(cla) {    
    let lowestA = Infinity;
    let studenstLow = [];

    cla.students.forEach(stu=> {
        const total = stu.marks.reduce((sum, mar)=> sum + mar.marks, 0);
        const avg = total / stu.marks.length;

        if(avg < lowestA) {
            lowestA = avg;
            studenstLow = [{ name: students.name, average: avg}];
        } else if(avg === lowest) {
            studenstLow.push({name: students.name, average: avg });
        }
    })
    return studenstLow;
}


/*

                                    <li class="s-stock-ul-li">

                                                    <div class="s-stock-ul-li-con">
                                                        <label class="s-stock-ul-li-out" for="">
                                                            <input class="s-stock-ul-li-outer stock-filter" value="in" type="checkbox">
                                                            <svg class="wc-block-components-checkbox__mark" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 20"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path></svg>
                                                            <span class="s-stock-ul-li-out-span">In stock</span>
                                                        </label>
                                                    </div>
                                                </li>
                                                <li class="s-stock-ul-li">
                                                    <div class="s-stock-ul-li-con">
                                                        <label class="s-stock-ul-li-out" for="">
                                                            <input class="s-stock-ul-li-outer stock-filter" value="out" type="checkbox">
                                                            <svg class="wc-block-components-checkbox__mark" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 20"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path></svg>
                                                            <span class="s-stock-ul-li-out-span">Out of stock</span>
                                                        </label>
                                                    </div>


                                                    
                                                </li>*/