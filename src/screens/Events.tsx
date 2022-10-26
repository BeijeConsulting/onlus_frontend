import React from "react"
// componenti
import Footer from "../components/footer/Footer"
import PreFooter from "../components/preFooter/PreFooter"
import CardEvents from "../components/cardEvents/CardEvents"
// stile



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
      <section className="container">
        <CardEvents/>
      </section>
      <PreFooter/>
      <Footer/>
    </div>
   
  ) 
}

export default Events
