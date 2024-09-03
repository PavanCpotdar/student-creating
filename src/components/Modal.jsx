import React from "react";

function Modal(props) {
  const {
    handleChange,
    student,
    handSubmit,
    section,
    maxDate,
    classSection,
    handleModal,
    errors,
    modal,
  } = props;

  return (
    modal && (
      <div className="modalShadow">
        <div className="modal">
          <form onSubmit={handSubmit}>
            <label htmlFor="fisrtName">First name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={student.firstName}
              onChange={handleChange}
            />
            {errors.firstName && (
              <span className="alertSpan">{errors.firstName}</span>
            )}
            <br />
            <label htmlFor="lastName">Last name</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={student.lastName}
              onChange={handleChange}
            />
            {errors.lastName && (
              <span className="alertSpan">{errors.lastName}</span>
            )}
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
            {errors.dob && <span className="alertSpan">{errors.dob}</span>}
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
            {errors.class && <span className="alertSpan">{errors.class}</span>}
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
            {errors.section && (
              <span className="alertSpan">{errors.section}</span>
            )}
            <br />
            <label htmlFor="rollNumber">Roll Number</label>
            <input
              type="text"
              name="rollNumber"
              id="rollNumber"
              value={student.rollNumber}
              disabled
            />
            <br />
            <button type="submit">Submit</button>
            <button type="reset" onClick={handleModal}>
              Cancel
            </button>
          </form>
        </div>
      </div>
    )
  );
}

export default Modal;
