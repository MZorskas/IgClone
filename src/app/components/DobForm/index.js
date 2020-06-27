import React, { useEffect, useState } from 'react';
import './index.scss';
import DropdownDate from 'react-dropdown-date';

// Date formatting
const formatDate = (date) => {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};

function DateOfBirthForm({ prevStep, body, setBody, handleSubmit, error }) {
  //   const input1 = useRef(null);
  const [date, setDate] = useState(null);
  const [day, setDay] = useState(null);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);

  const updateForm = (e) => {
    e.preventDefault();
    if (!day || !month || !year) {
      return;
    }
    setBody({ ...body, dateOfBirth: formatDate(date) });
    handleSubmit();
  };

  useEffect(() => {
    if (error) {
      prevStep();
    }
  }, [error, prevStep]);

  return (
    <React.Fragment>
      <div className="DateOfBirthFormBox">
        <h3>Add Your Birthday</h3>
        <h6>This won't be a part of your public profile.</h6>
        <form className="DateOfBirthForm" onSubmit={updateForm}>
          <DropdownDate
            order={
              // optional
              ['year', 'month', 'day'] // Order of the dropdowns
            }
            onMonthChange={(month) => {
              // optional
              console.log(month);
              setMonth(month);
            }}
            onDayChange={(day) => {
              // optional
              console.log(day);
              setDay(day);
            }}
            onYearChange={(year) => {
              // optional
              console.log(year);
              setYear(year);
            }}
            onDateChange={(date) => {
              // optional
              console.log(date);
              setDate(date);
            }}
            classes={
              // optional
              {
                dateContainer: 'dateContainer',
                yearContainer: 'dateInput',
                monthContainer: 'dateInput',
                dayContainer: 'dateInput',
                year: 'dateSelect',
                month: 'dateSelect',
                day: 'dateSelect',
                yearOptions: 'select',
                monthOptions: 'select',
                dayOptions: 'select',
              }
            }
            defaultValues={
              // optional
              {
                year: 'Year',
                month: 'Month',
                day: 'Day',
              }
            }
            required={{ year: true, month: true, day: true }}
            options={
              // optional
              {
                yearReverse: true, // false by default
                monthShort: true, // false by default
                monthCaps: false, // false by default
              }
            }
          />
          <input
            type="submit"
            value="Register"
            className={!day || !month || !year ? 'btn btn-light' : 'btn'}
          />
          <span
            onClick={() => {
              prevStep();
            }}
          >
            Go Back
          </span>
        </form>
      </div>
    </React.Fragment>
  );
}

export default DateOfBirthForm;
