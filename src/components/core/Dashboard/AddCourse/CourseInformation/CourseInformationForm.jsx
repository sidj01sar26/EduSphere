import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from '../../../../../services/operation/courseDetailsAPI';
import {HiOutlineCurrencyRupee} from "react-icons/hi"
import RequirementField from './RequirementField';
import { setCourse, setStep } from '../../../../../slices/courseSlice';
import IconButton from '../../../../common/IconButton';
import toast from 'react-hot-toast';
import { COURSE_STATUS } from '../../../../../utils/constants';
import CourseTags from './CourseTags';
import MediaUpload from '../MediaUpload';

const CourseInformationForm = () => {

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: {errors},
  } = useForm()

  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);

  const {course, editCourse} = useSelector((state) => state.course);
  const {token} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategories = async() => {
      setLoading(true)
      const categories = await fetchCourseCategories()
      if(categories.length > 0) {
        console.log("categories", categories)
        setCourseCategories(categories)
      }
      setLoading(false)
    }

    if(editCourse){
      setValue("courseTitle", course.courseName);
      setValue("courseShortDesc", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tag);
      setValue("courseBenefits", course.whatYouWillLearn);
      setValue("courseCategory", course.category);
      setValue("courseRequirments", course.instructions);
      setValue("courseImage", course.thumbnail);
    }

    getCategories()
    // eslint-disable-next-line
  }, [])

  const isUpdatedForm = () => {
    const currentValues = getValues();
    if(
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseRequirments.toString() !== course.instructions.toString() ||
      currentValues.courseImage !== course.thumbnail
    ) return true;
    else 
      return false;
  }

  // Handle Next Button
  const onSubmit = async(data) => {
    if(editCourse){
      if(isUpdatedForm()) {
        const currentValues = getValues();
          const formData = new FormData();

          formData.append("courseId", course._id);

          if(currentValues.courseTitle !== course.courseName) {
            formData.append("courseName", data.courseTitle);
          }

          if(currentValues.courseShortDesc !== course.courseDescription) {
            formData.append("courseDescription", data.courseShortDesc);
          }

          if(currentValues.coursePrice !== course.price) {
            formData.append("price", data.coursePrice);
          }

          if(currentValues.courseTags.toString() !== course.tag.toString()) {
            formData.append("tag", JSON.stringify(data.courseTags));
          }

          if(currentValues.courseBenefits !== course.whatYouWillLearn) {
            formData.append("whatYouWillLearn", data.courseBenefits);
          }

          if(currentValues.courseCategory._id !== course.category._id) {
            formData.append("category", data.courseCategory);
          }

          if(currentValues.courseRequirments.toString() !== course.instructions.toString()) {
            formData.append("instructions", JSON.stringify(data.courseRequirments));
          }

          if(currentValues.courseImage !== course.thumbnail) {
            formData.append("thumbnailImage", data.courseImage);
          }

          setLoading(true);
          const result = await editCourseDetails(formData, token);
          setLoading(false)

          if(result){
            dispatch(setStep(2))
            dispatch(setCourse(result))
          }
        }
        else{
          toast.error("No Changes made to the form")
        }
        return
      }
      
      // Create a new course
      const formData = new FormData();
      formData.append("courseName", data.courseTitle);
      formData.append("courseDescription", data.courseShortDesc);
      formData.append("price", data.coursePrice);
      formData.append("whatYouWillLearn", data.courseBenefits);
      formData.append("category", data.courseCategory);
      formData.append("instructions", JSON.stringify(data.courseRequirments));
      formData.append("tag", JSON.stringify(data.courseTags));
      formData.append("thumbnailImage", data.courseImage);
      formData.append("status", COURSE_STATUS.DRAFT);

      setLoading(true)
      const result = await addCourseDetails(formData, token)
      if(result){
        dispatch(setStep(2))
        dispatch(setCourse(result))
      }
      setLoading(false)
      console.log("PRINTING FORMDATA", formData)
      console.log("PRINTING RESULT", result)
  }

  return (
    <form
    onSubmit={handleSubmit(onSubmit)}
    className=' bg-richblack-800 border-[1px] border-richblack-700 rounded-lg p-6 space-y-6'
    >

      {/* Course Title */}
      <div className="flex flex-col space-y-2">
        <label 
        htmlFor='courseTitle'
        className="text-sm text-richblack-5">Course Title <sup className=' text-pink-300'>*</sup></label>
        <input
         id='courseTitle'
         placeholder='Enter Course Title'
         {...register("courseTitle", {required:true})}
         className='form-style w-full'
        />
        {
          errors.courseTitle && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">Course Title is Required</span>
          )
        }
      </div>

      {/* Course Description */}
      <div className="flex flex-col space-y-2">
        <label 
        className="text-sm text-richblack-5"
        htmlFor='courseShortDesc'>Course Short Description <sup className=' text-pink-300'>*</sup></label>
        <textarea
         id='courseShortDesc'
         placeholder='Enter Course Description'
         {...register("courseShortDesc", {required:true})}
         className='form-style resize-x-none min-h-[140px] w-full'
        />
        {
          errors.courseShortDesc && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">Course Description is Required</span>
          )
        }
      </div>

      {/* Course Price */}
      <div className="flex flex-col space-y-2">
        <label 
        className="text-sm text-richblack-5"
        htmlFor='coursePrice'>Course Price<sup className=' text-pink-300'>*</sup></label>
        <div className='relative flex'>
          <input
          id='coursePrice'
          placeholder='Enter Course Price'
          {...register("coursePrice", {
            required:true,
            valueAsNumber:true,
            pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
              },
            })}
          className='form-style w-full !pl-12'
          />
          <HiOutlineCurrencyRupee className="absolute left-[1rem] top-1/3 inline-block  text-2xl text-richblack-400"/>
        </div>
        {
          errors.coursePrice && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">Course Price is Required</span>
          )
        }
      </div>

      {/* Course Category */}
      <div className="flex flex-col space-y-2">
        <label 
        className="text-sm text-richblack-5"
        htmlFor="courseCategory">Course Category<sup className=' text-pink-300'>*</sup></label>
        <select
         id="courseCategory"
         defaultValue=""
         {...register("courseCategory", {required:true})}
         className="form-style w-full"
         >
            <option
             value=""
             disabled>
             Choose a Category
            </option>

            {
              !loading && courseCategories?.map((category, index) => (
                <option
                 key={index}
                 value={category?._id}
                 >
                  {category?.name}
                 </option>
              ))
            }
         </select>
         {
          errors.courseCategory && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">Course Category is Required</span>
          )
         }
      </div>

      {/* Course Tags */}
      <CourseTags
        label="Tags"
        name="courseTags"
        placeholder="Choose a Tag"
        setValue={setValue}
        getValues={getValues}
        register={register}
        errors={errors}
      />

      {/* Course Thumbnail */}
      <MediaUpload
        name="courseImage"
        label="Course Thumbnail"
        setValue={setValue}
        register={register}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />

      {/* Benefits of the Course */}
      <div className="flex flex-col space-y-2">
        <label 
        className="text-sm text-richblack-5"
        htmlFor="courseBenefits">Benefits of the Course<sup className=' text-pink-300'>*</sup></label>
        <textarea
         id="courseBenefits"
         placeholder='Enter Benefits Of the course'
         {...register("courseBenefits", {require: true})}
         className="form-style resize-x-none min-h-[130px] w-full"
         />
         {
          errors.courseBenefits && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">Benefits of the course are required</span>
          )
         }
      </div>

      {/* Requirements field */}
      <RequirementField
        name="courseRequirments"
        lable="Requirements/Instructions"
        register={register}
        setValue={setValue}
        getValues={getValues}
        errors={errors}
      />

      <div className="flex justify-end gap-x-2">
        {
          editCourse && (
            <button
            onClick={() => dispatch(setStep(2))}
            disabled={loading}
            className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
            >
              Continue Without Saving
            </button>
          )
        }

        <IconButton
        disabled={loading}
          text={!editCourse ? "Next" : "Save Changes"}
        />
      </div>
      
    </form>
  )
}

export default CourseInformationForm
