import { useEffect, useState } from "react";
import "./App.css";
import Modal from "./components/Modal";

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
  },
];

function App() {
  const [modal, setModal] = useState(false);
  const [section, setSection] = useState([]);
  const [student, setStudent] = useState(initialValue);
  const [studentList, setStudentList] = useState(initialList);
  const [studentListCopy, setStudentListCopy] = useState(initialList);
  const [maxDate, setMaxDate] = useState("");
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    let fieldName = e.target.name;
    let fieldValue = e.target.value;
    let studentCopy = { ...student };
    studentCopy[fieldName] = fieldValue;

    if (fieldName === "class") {
      const copy = classSection
        .filter((classValue, i) => fieldValue == classValue.class)
        .map((e) => e.section);
      setSection(...copy);
      studentCopy["section"] = "";
    }

    if (fieldName === "section") {
      // studentCopy[rollNumber] = fieldValue
      studentCopy = generateRollNumber(studentCopy);
    }
    setStudent(studentCopy);
  }

  function generateRollNumber(studentAdded) {
    const students = studentList.filter(
      (val) =>
        val.class == studentAdded.class && val.section === studentAdded.section
    );
    let uniqueNumber = students.length > 0 ? students.length + 1 : 1;
    let studentCopy = { ...studentAdded };

    studentCopy["rollNumber"] =
      studentAdded.class +
      studentAdded.section +
      uniqueNumber.toString().padStart(3, "0");

    return studentCopy;
  }

  const validate = () => {
    let studentErrors = {};

    // Username validation: required field
    if (!student.firstName.trim()) {
      studentErrors.firstName = "First name is required";
    } else if (!/^[A-Za-z]+$/.test(student.firstName)) {
      studentErrors.firstName = "First name is not valid";
    }
    if (!student.lastName.trim()) {
      studentErrors.lastName = "Last name is required";
    } else if (!/^[A-Za-z]+$/.test(student.lastName)) {
      studentErrors.lastName = "Last name is not valid";
    }
    if (!student.dob.trim()) {
      studentErrors.dob = "DOB is required";
    }
    if (!student.class.trim()) {
      studentErrors.class = "class is required";
    }
    if (!student.section.trim()) {
      studentErrors.section = "section is required";
    }
    // if (!student.firstName.trim()) {
    //   studentErrors.username = 'Username is required';
    // }
    setErrors(studentErrors);
    return Object.keys(studentErrors).length === 0;
  };

  function handSubmit(event) {
    event.preventDefault();

    if (validate()) {
      setStudentList((prev) => [student, ...prev]);
      setStudentListCopy((prev) => [student, ...prev]);
      setStudent(initialValue);
      setModal(false);
    } else {
      console.log("student has errors.");
    }
  }

  function handleSearchStudent(event) {
    let filedName = event.target.name;
    let name = event.target.value.toLowerCase();
    if (!name) {
      setStudentList(studentListCopy);
    } else {
      let list;
      if (filedName === "search-name") {
        list = studentList.filter((studentObj) =>
          studentObj.firstName.toLowerCase().includes(name)
        );
      }
      if (filedName === "search-rollNumber") {
        list = studentList.filter((studentObj) =>
          studentObj.rollNumber.toLowerCase().includes(name)
        );
      }
      setStudentList(list);
    }
  }

  function handleModal(e) {

    setModal((prev) => !prev);
    setStudent(initialValue);
    setErrors({});
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
        <input
          type="text"
          name="search-name"
          id=""
          placeholder="Search student name"
          onChange={handleSearchStudent}
        />
        <input
          type="text"
          name="search-rollNumber"
          id=""
          placeholder="Search student Roll Number"
          onChange={handleSearchStudent}
        />
        <button onClick={handleModal}>Add new student</button>
      </div>

      {/* Modal Section */}

      <Modal
        modal={modal}
        handleChange={handleChange}
        handSubmit={handSubmit}
        section={section}
        handleModal={handleModal}
        student={student}
        maxDate={maxDate}
        classSection={classSection}
        errors={errors}
      />

      <h3>Student list</h3>

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
                <td>{student.firstName}</td>
                <td>{student.class}</td>
                <td>{student.section}</td>
                <td>{student.rollNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default App;
