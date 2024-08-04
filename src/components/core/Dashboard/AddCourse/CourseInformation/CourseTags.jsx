import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux'
import {MdClose} from 'react-icons/md'
import { useEffect } from 'react';

const CourseTags = ({label, name, placeholder, setValue, getValues, register, errors}) => {

    const {editCourse, course} = useSelector((state) => state.course);

    const [tags, setTags] = useState([]);

    useEffect(() => {
        if(editCourse){
            setTags(course?.tag)
        }
        register(name, {
            require: true,
            validate: (value) => value.length > 0
        })
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        setValue(name, tags)
        // eslint-disable-next-line
    },[tags])

    const handleKeyDown = (event) => {
        if(event.key === "Enter" || event.key === ","){
            event.preventDefault()
            const tagsValue = event.target.value.trim()
            if(tagsValue && !tags.includes(tagsValue)){
                const newTags = [...tags, tagsValue]
                setTags(newTags)
                event.target.value = ""
            }
        }
    }

    const handleDeleteTag = (tagIndex) => {
        const newTags = tags.filter((_,index) => index !== tagIndex)
        setTags(newTags)
    }

  return (
    <div className=' flex flex-col space-y-2'>
      <label 
        htmlFor={name}
        className=' text-sm text-richblack-5'
        > {label}<sup className=' text-pink-300'>*</sup> </label>

      <div className=' flex w-full flex-wrap gap-y-2'>
        {
            tags.map((tag, index) => (
                <div
                key={index}
                className='m-1 flex items-center rounded-full bg-yellow-400 px-2 py-2 text-sm text-richblack-5'
                >
                    {tag}
                    <button
                    type="button"
                    onClick={() => handleDeleteTag(index)}
                    className=' ml-2 focus:outline-none'
                    >
                        <MdClose className=' text-sm'/>
                    </button>
                </div>
            ))
        }

        <input
         type="text"
         id={name}
         name={name}
         placeholder={placeholder}
         onKeyDown={handleKeyDown}
         className='form-style w-full'
        />
      </div>
      {
        errors[name] && (
            <span
            className=' ml-2 text-xs text-pink-200 tracking-wide'
            > {label} is Required </span>
        )
      }
    </div>
  )
}

export default CourseTags
