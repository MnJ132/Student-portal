const students = {

    "230100000001": {
        dob: "2005-01-15",
        name: "ATCHAYA R",
        department: "Information Technology",
        semester: "V Semester",

        subjects: [
            {name:"Java Programming", marks:95, grade:"O"},
            {name:"DBMS", marks:91, grade:"O"},
            {name:"Computer Networks", marks:88, grade:"A+"},
            {name:"Web Technology", marks:90, grade:"O"},
            {name:"Software Engineering", marks:87, grade:"A+"}
        ],

        total:451,
        percentage:"90.2%",
        cgpa:"9.1",
        result:"PASS"
    },

    "230100000002": {
        dob: "2005-03-20",
        name: "RAHUL K",
        department: "Computer Science",
        semester: "V Semester",

        subjects: [
            {name:"Java Programming", marks:82, grade:"A"},
            {name:"DBMS", marks:79, grade:"B+"},
            {name:"Computer Networks", marks:85, grade:"A"},
            {name:"Web Technology", marks:88, grade:"A+"},
            {name:"Software Engineering", marks:90, grade:"O"}
        ],

        total:424,
        percentage:"84.8%",
        cgpa:"8.6",
        result:"PASS"
    },

    "230100000003": {
        dob: "2005-05-08",
        name: "PRIYA S",
        department: "Electronics",
        semester: "V Semester",

        subjects: [
            {name:"Digital Electronics", marks:93, grade:"O"},
            {name:"Microprocessor", marks:95, grade:"O"},
            {name:"Signals", marks:91, grade:"O"},
            {name:"Communication", marks:89, grade:"A+"},
            {name:"VLSI", marks:92, grade:"O"}
        ],

        total:460,
        percentage:"92%",
        cgpa:"9.4",
        result:"PASS"
    }

};

function showResult(){

    let regno = document.getElementById("regno").value;
    let dob = document.getElementById("dob").value;

    if(!students[regno]){
        alert("Register Number not found");
        return;
    }

    if(students[regno].dob !== dob){
        alert("Incorrect Date of Birth");
        return;
    }

    let s = students[regno];

    document.getElementById("reg").innerHTML = regno;

    document.getElementById("studentName").innerHTML = s.name;
    document.getElementById("department").innerHTML = s.department;
    document.getElementById("semester").innerHTML = s.semester;

    let rows = "";

    s.subjects.forEach(sub=>{
        rows += `
        <tr>
            <td>${sub.name}</td>
            <td>${sub.marks}</td>
            <td>${sub.grade}</td>
        </tr>`;
    });

    document.getElementById("marksTable").innerHTML = rows;

    document.getElementById("total").innerHTML = s.total;
    document.getElementById("percentage").innerHTML = s.percentage;
    document.getElementById("cgpa").innerHTML = s.cgpa;
    document.getElementById("status").innerHTML = s.result;

    document.getElementById("result").style.display="block";

}