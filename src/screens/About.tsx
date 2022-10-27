

//Components
import Footer from "../components/footer/Footer"
import Header from "../components/hooks/Header/Header"
import Hero from "../components/hooks/Hero/Hero"
import PreFooter from "../components/preFooter/PreFooter"

//Styles
import "../styles/about.scss"

function About() {
  return(
    <>
      <Header />

      <Hero />
      <main>
        <h1>Chi siamo</h1>
        <section>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem iusto aliquam exercitationem velit odit maiores, natus architecto veritatis hic rerum delectus tempora, officia soluta sit sapiente! Accusamus id obcaecati quas.</section>
      </main>
      


      <PreFooter />
      <Footer />
    </>
  )
}

export default About
