import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Review = () => {
    const {id} = useParams();
    const [review , setReview] = useState({
        name:"",
        review:"",
        comment:"",
    });
    const handleInputChange = (e) => {
        setReview({...review , [e.target.name] : e.target.value });
    }

    const handleSubmitForm = async(e) => {
        e.preventDefault();
        console.log(review);
        const formData = new FormData();
        formData.append("name" , review.name);
        formData.append("review" , review.review);
        formData.append("comment" , review.comment);
        try {
            const response = await axios.post(`http://localhost:8000/api/v1/hotel:${id}/review`)
            console.log(response.data.newReview);
            if(response.status === 200){
                setReview({
                name:"",
                review:"",
                comment:""
            });
            }
            window.location.reload();
        } catch (error) {
            console.error("Failed to create review", error);
    }

    }
  return (
   <>

<div>
<h1>Submit Your Review</h1>
<form
className="border-gray-500 border-2 w-max m-auto p-5 rounded-lg"
onSubmit={handleSubmitForm}
>
<br />
<input
  type="text"
  placeholder="enter Name"
  required
  name="name"
  className="border-gray-500 border-2"
  value={review.name}
  onChange={handleInputChange}
></input>
<br />
<br />
<input
  type="range"
  placeholder="enter range "
  min={1}
  max={5}
  required
  name="review"
  className="border-gray-500 border-2"
  value={review.review}
  onChange={handleInputChange}
></input>
<br />
<input
  type="text"
  placeholder="enter comment"
  required
  name="comment"
  className="border-gray-500 border-2"
  value={review.comment}
  onChange={handleInputChange}
></input>
<br />
<br /> <br />
<button type="submit" className="border-gray-500 border-2">
  Submit Review
</button>
</form>
</div>
   </>
  )
}

export default Review

