import React, { useEffect, useState } from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import "swiper/css"
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import { Autoplay, FreeMode, Pagination}  from 'swiper/modules'
import ReactStars from "react-rating-stars-component"
import { apiConnector } from '../../services/apiconnector';
import { ratingsEndpoints } from '../../services/apis';
import { FaStar } from 'react-icons/fa';
import "../../App.css"

const ReviewSlider = () => {

    const [reviews, setReviews] = useState([]);
    const truncateWords = 15;

    useEffect(() => {
        const fetchAllReviews = async() => {
            const {data} = await apiConnector("GET", ratingsEndpoints.REVIEWS_DETAILS_API)
            console.log("RATING RESPONSE: ", data)

            if(data?.success){
                setReviews(data?.data)
            }

            console.log("Printing Reviews", reviews);
        }
        fetchAllReviews();
        // eslint-disable-next-line
    }, [])

  return (
    <>
      <div className=" my-[50px] h-[184px] max-w-maxContentTab lg:max-w-maxContent justify-center items-center">
        <Swiper
        slidesPerView={2}
        spaceBetween={24}
        loop={true}
        freeMode={true}
        autoplay={{
            delay: 2500,
        }}
        modules={[FreeMode, Pagination, Autoplay]}
        className="w-full"
        >

          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col gap-3 bg-richblack-800 p-3 text-[14px] text-richblack-25">
                <div className="flex items-center gap-4">
                    <img
                    src={review?.user?.image 
                    ? review?.user?.image
                    : `https://api.dicebear.com/6.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`} 
                    alt="" 
                    className=' h-9 w-9 rounded-full object-cover' 
                    />
                    <div className="flex flex-col">
                        <h3 className="font-semibold text-richblack-5">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h3>
                        <p className="text-[12px] font-medium text-richblack-500">{review?.course?.courseName}</p>
                    </div>
                </div>

                <p className="font-medium text-richblack-25">
                  {review?.review.split(" ").length > truncateWords ? `${review?.review.split(" ").slice(0, truncateWords).join(" ")} ...` : `${review?.review}`}  
                </p>

                <div className="flex items-center gap-2 ">
                    <p className="font-semibold text-yellow-100">{review?.rating.toFixed(1)}</p>
                    <ReactStars
                    count={5}
                    value={review.rating}
                    size={20}
                    edit={false}
                    activeColor="#ffd700"
                    emptyIcon={<FaStar/>}
                    fullIcon={<FaStar/>} />
                </div>
              </div>
            </SwiperSlide>
          ))}

        </Swiper>
      </div>
    </>
  )
}

export default ReviewSlider
