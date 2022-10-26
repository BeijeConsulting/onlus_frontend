import React from "react"
// componenti
import Footer from "../components/footer/Footer"
import PreFooter from "../components/preFooter/PreFooter"

// mokup eventi
const EVENTI:Array<object> = [
  {
    title:'',
    image:'',
    description:'',
    requirement:'',
    date:'',
    time:'',
    place:''
  }
]

function Events() {
  return(
   
    <div id="events">
      <PreFooter/>
      <Footer/>
    </div>
   
  ) 
}

export default Events
