import React, { useState } from 'react'
import {Chart, registerables} from "chart.js"
import {Pie} from "react-chartjs-2"

Chart.register(...registerables)

const InstructorChart = ({courses}) => {

    const [currChart, setCurrChart] = useState("students")

    // Function To generate Random Colors
    const getRandomColors = (numColors) => {
        const colors = [];
        for(let i=0; i<numColors; i++) {
            const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
            colors.push(color)
        }
        return colors;
    }

    // Create data for displaying student info
    const chartDataForStudents = {
        labels: courses.map((course) => course.courseName),
        datasets: [
            {
                data: courses.map((course) => course.totalStudentsEnrolled),
                backgroundColor: getRandomColors(courses.length),
            }
        ]
    }

    // Data for the chart displaying income information
    const chartDataForIncome = {
        labels: courses.map((course) => course.courseName),
        datasets: [
            {
                data: courses.map((course) => course.totalAmountGenarated),
                backgroundColor: getRandomColors(courses.length),
            }
        ]
    }

    // create options
    const options = {
        maintainAspectRatio: false,
    }

  return (
    <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6">
      <p className="text-lg font-bold text-richblack-5">Visualise</p>
      <div className="space-x-4 font-semibold">
        <button
        onClick={() => setCurrChart("students")}
        className={`${currChart === "students" ? " text-yellow-50 bg-richblack-700" : " text-yellow-400"} rounded-sm p-1 px-3 transition-all duration-200`}
        >
            Student
        </button>

        <button
        onClick={() => setCurrChart("income")}
        className={`${currChart === "income" ? " text-yellow-50 bg-richblack-700" : " text-yellow-400"} rounded-sm p-1 px-3 transition-all duration-200`}
        >
            Income
        </button>
      </div>
      <div className="relative mx-auto aspect-square h-full w-full">
        <Pie 
          data={currChart === "students" ? chartDataForStudents : chartDataForIncome}
          options={options}
        />
      </div>
    </div>
  )
}

export default InstructorChart
