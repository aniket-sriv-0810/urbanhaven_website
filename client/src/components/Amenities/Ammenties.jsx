import React from 'react'
import { FaWifi, FaCarAlt } from "react-icons/fa";
import { TbAirConditioning } from "react-icons/tb";
import { GiToaster } from "react-icons/gi";
import { MdDinnerDining } from "react-icons/md";
const Amenities = () => {
  return (
  <>

<div>
<ul  >
<li className='flex  flex-row item-center' ><FaWifi className='mx-3 my-1'/> Free Unlimited Wifi </li>
<li className='flex  flex-row'><TbAirConditioning className='mx-3 my-1' /> <p>Air Conditioning</p></li>
<li className='flex  flex-row'><GiToaster className='mx-3 my-1'/>Toaster</li>
<li className='flex  flex-row'><FaCarAlt className='mx-3 my-1' />Free parking on premises</li>
<li className='flex  flex-row'><MdDinnerDining className='mx-3 my-1'/>Breakfast</li>
</ul>

</div>

  </>
  )
}

export default Amenities
