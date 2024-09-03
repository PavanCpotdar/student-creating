import { useEffect, useState } from "react";
import "./App.css";

const classSection = [
  { class: 1, section: ["A", "B"] },
  { class: 2, section: ["A", "B", "C"] },
  { class: 3, section: ["A"] },
  { class: 4, section: ["A"] },
  { class: 5, section: ["A", "B", "C", "D"] },
  { class: 6, section: ["A", "B"] },
  { class: 7, section: ["A", "B"] },
  { class: 8, section: ["A", "B"] },
  { class: 9, section: ["A", "B"] },
  { class: 10, section: ["A", "B"] },
];

const initialValue = {
  firstName: "",
  lastName: "",
  dob: "",
  class: "",
  section: "",
  rollNumber: "",
};

const initialList = [
  {
    firstName: "Anand",
    lastName: "N",
    dob: "10",
    class: 3,
    section: "B",
    rollNumber: "3B001",
  }
]


function App() {
 


  const [modal, setModal] = useState(false);
  const [section, setSection] = useState([]);
  const [studentList, setStudentList] = useState(initialList);
  const [studentListCopy, setStudentListCopy] = useState(initialList);
  const [maxDate, setMaxDate] = useState("");

  const [student, setStudent] = useState(initialValue);

  function handleChange(e) {
    console.log("e.target.name", e.target.name);
    console.log("e.target.name", e.target.value);
    let fieldName = e.target.name;
    let fieldValue = e.target.value;
    let studentCopy = { ...student };
    studentCopy[fieldName] = fieldValue;

    if (fieldName === "class") {
      const copy = classSection
        .filter((classValue, i) => fieldValue == classValue.class)
        .map((e) => e.section);
      setSection(...copy);
    }

    if (fieldName === "section") {
      // studentCopy[rollNumber] = fieldValue
      studentCopy = generateRollNumber(studentCopy);
    }
    setStudent(studentCopy);
  }

  function generateRollNumber(studentAdded) {
    const students = studentList.filter(
      (val) => val.class == studentAdded.class
    );
    console.log("gen", students, students.length);
    let uniqueNumber = students.length > 0 ? students.length + 1 : 1;
    console.log("uniqueNumber", uniqueNumber);
    let studentCopy = { ...studentAdded };

    studentCopy["rollNumber"] =
      studentAdded.class + studentAdded.section + uniqueNumber;

    console.log(studentCopy);
    return studentCopy;
  }

  function handSubmit(event) {
    event.preventDefault();
    let studentListCopy = [...studentList];
    studentListCopy.unshift(student);
    setStudentList(studentListCopy);
    setStudentListCopy(studentListCopy);
    setStudent(initialValue);
    setModal(false);
  }

  function handleSearchStudent(event) {
    let name = event.target.value;
    console.log(name);
    if (!name) {
      setStudentList(studentListCopy);
    } else {
      let list = studentList.filter((studentObj) =>
        studentObj.firstName.includes(name)
      );
      list;
      setStudentList(list);
    }
  }

  function handleModal() {
    setModal((prev) => !prev);
    setStudent(initialValue);
  }

  useEffect(() => {
    const today = new Date();
    const pastDate = new Date();
    pastDate.setFullYear(today.getFullYear());
    const maxDate = pastDate.toISOString().split("T")[0];

    setMaxDate(maxDate);
  }, []);

  return (
    <>
      <div className="searchbox">
        <input type="text" name="search" id="" placeholder="Search student name" onChange={handleSearchStudent} />
        <button onClick={handleModal}>Add new student</button>
      </div>

      {/* Modal Section */}

      {modal && (
        <div className="modalShadow">
          <div className="modal">
            <form>
              <label htmlFor="fisrtName">First name</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={student.firstName}
                onChange={handleChange}
              />
              <br />
              <label htmlFor="lastName">Last name</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={student.lastName}
                onChange={handleChange}
              />
              <br />
              <label htmlFor="dob">Date Of Birth</label>
              <input
                type="date"
                name="dob"
                id="dob"
                value={student.dob}
                onChange={handleChange}
                max={maxDate}
              />
              <br />
              <label htmlFor="class">Class</label>
              <select
                className="inputFeild"
                name="class"
                id="class"
                value={student.class}
                onChange={handleChange}
              >
                {" "}
                <option value="">Please select class</option>
                {classSection.map((classValue, i) => {
                  return (
                    <option key={i} value={`${classValue.class}`}>
                      {classValue.class}
                    </option>
                  );
                })}
              </select>
              <br />
              <label htmlFor="section">Section</label>
              <select
                name="section"
                id="section"
                className="inputFeild"
                onChange={handleChange}
                value={student.section}
              >
                <option value="">Please select Section</option>
                {section?.map((value, i) => {
                  return (
                    <option key={i} value={`${value}`}>
                      {value}
                    </option>
                  );
                })}
              </select>
              <br />
              <label htmlFor="rollNumber"></label>
              <input
                type="text"
                name="rollNumber"
                id="rollNumber"
                value={student.rollNumber}
                disabled
              />
              <br />
              <button onClick={handSubmit}>Submit</button>
              <button onClick={handleModal}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Class</th>
            <th>Section</th>
            <th>Roll NUmber</th>
          </tr>
        </thead>

        <tbody>
          {studentList?.map((student, i) => {
            return (
              <tr key={i}>
                <th>{student.firstName}</th>
                <th>{student.class}</th>
                <th>{student.section}</th>
                <th>{student.rollNumber}</th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default App;
