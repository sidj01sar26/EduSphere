import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux';

const RequirementField = ({name, lable, register, setValue, getValues, errors}) => {

    const [requirement, setRequirement] = useState("");
    const [requirementList, setRequirementList] = useState([])
    const { editCourse, course } = useSelector((state) => state.course)

    useEffect(() => {
        if(editCourse){
            setRequirementList(course?.instructions)
        }
        register(name, {
            require: true,
            validate: (value) => value.length > 0
        })
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        setValue(name, requirementList)
        // eslint-disable-next-line
    }, [requirementList])

    const handleAddRequirement = () => {
        if(requirement) {
            setRequirementList([...requirementList, requirement])
            setRequirement("")
        }
    }

    const handleRemoveRequirement = (index) => {
        const updatedRequirementList = [...requirementList]
        updatedRequirementList.splice(index, 1)
        setRequirementList(updatedRequirementList)
    }

  return (
    <div className="flex flex-col space-y-2">
        <label 
        className="text-sm text-richblack-5"
        htmlFor={name}>{lable}</label>
        <div className="flex flex-col items-start space-y-2">
            <input 
                type="text" 
                id={name}
                onChange={(e) => setRequirement(e.target.value)}
                value={requirement}
                className="form-style w-full"
            />
            <button
            type='button'
            onClick={handleAddRequirement}
            className="font-semibold text-yellow-50">
                Add
            </button>
        </div>

        {requirementList.length > 0 && (
            <ul className="mt-2 list-inside list-disc">
                {requirementList.map((requirement, index) => (
                    <li 
                    className="flex items-center text-richblack-5"
                    key={index}>
                      <span>{requirement}</span>
                      <button
                      type='button'
                      className="ml-2 text-xs text-pure-greys-300 "
                      onClick={() => handleRemoveRequirement(index)}>
                        Clear
                      </button>
                    </li>
                    ))}
            </ul>
        )}

        {
            errors[name] && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">{lable} is Required</span>
            )
        }
    </div>
  )
}

export default RequirementField
