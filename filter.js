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
