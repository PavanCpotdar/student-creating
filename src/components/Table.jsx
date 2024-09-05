import React from 'react'

function Table({studentList}) {
  return (
    <>
       <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Class</th>
            <th>Section</th>
            <th>Roll Number</th>
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
  )
}

export default Table
