import React from 'react'

const StatsCount = [
    {count: "5K", lable:"Active Students"},
    {count: "10+", lable:"Mentors"},
    {count: "200+", lable:"Courses"},
    {count: "50+", lable:"Awards"},
]

const Stats = () => {
  return (
    <div className=' bg-richblack-700'>
    {/* Stats */}
      <div className=' w-11/12 max-w-maxContent flex flex-col justify-between mx-auto text-white'>
        <div className=' grid md:grid-cols-4 grid-cols-2 text-center gap-x-3'>
            {
                StatsCount.map((stat, index) => {
                    return(
                        <div 
                        key={index}
                        className=' py-10 flex flex-col gap-3'
                        >
                            <h2 className="text-[30px] font-bold text-richblack-5">{stat.count}</h2>
                            <p className="font-semibold text-[16px] text-richblack-500">{stat.lable}</p>
                        </div>
                    )
                })
            }
        </div>
      </div>
    </div>
  )
}

export default Stats
