// react import
import { useEffect, FC } from "react"
// traduzioni
import { useTranslation } from "react-i18next"
// componenti
import Hero from "../components/hooks/Hero/Hero"
import Footer from "../components/footer/Footer"
import PreFooter from "../components/preFooter/PreFooter"
// style
import '../styles/home.scss'
import Header from "../components/hooks/Header/Header"

// mokup home (il json reale sarà diverso)
const MokupHome = {
  hero:{
    title:"Salva i panda dai bambù",
    subtitle:"Loremfzdsoifgzdsoihgfzdsoigfdzsoifghzdsoigfhziofgz",
    image: "pandaImg.jpg"
  },
  results: {
    resultTitle: 'lorem ipsum dei risultati',
    resultsImage: 'https://cdn-icons-png.flaticon.com/512/16/16121.png?w=360',
    resultsCaption: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos architecto consequuntur ab quasi nostrum rem error numquam! Error laborum sit iusto fugit, doloribus doloremque quos repellendus minima. Architecto, sequi adipisci.',
    staticsResults: {
      staticsOne: 20,
      staticsTwo: 40,
      staticTrhee: 39
    }
  },
  stayUpToDate: {
    subTitle: 'Seguici su facebook',
    link:'https://www.wwf.it/'
  },
  story: {
    title:'Storia...',
    description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos architecto consequuntur ab quasi nostrum rem error numquam! Error laborum sit iusto fugit, doloribus doloremque quos repellendus minima. Architecto, sequi adipisci.',
    image:'https://leganerd.com/wp-content/uploads/2016/10/pandas-live_64dff22c2fe56e9-999x562.jpg'
  }
}


const Home: FC = () => {

  // inizializzo traduzioni
  const { t }: any = useTranslation()

  return (
    <div id="home">
      {/* hero */}
      {/* risultati */}
      <Header isHome={true}/>
      
      <Hero type={"home"} title={MokupHome.hero.title} subtitle={MokupHome.hero.subtitle} image={MokupHome.hero.image}/>
      <main>
        <section className="results">
          <h4 className="title">
            {MokupHome.results.resultTitle}
          </h4>
          <figure>
            <img src={MokupHome.results.resultsImage} alt="illustrative image" />
          </figure>
          <div className="statics">
            <div>
              <h6>
                {MokupHome.results.staticsResults.staticsOne} %
              </h6>
            </div>
            <div>
              <h6>
                {MokupHome.results.staticsResults.staticsOne} %
              </h6>
            </div>
            <div>
              <h6>
                {MokupHome.results.staticsResults.staticsOne} %
              </h6>
            </div>
          </div>
          <div className="caption">
            <p>
              {MokupHome.results.resultsCaption}
            </p>
          </div>
        </section>
      </main>
      {/* componente unisciti a noi da inserire*/}
      <main>
        {/* sezione eventi */}
        <section className="events">

        </section>
        {/* sezione articoli blog */}
        <section className="articles">

        </section>
        {/* sezione rimani aggiornato sui social */}
        <section className="stayUpToDate">
          <h4 className="title">
            {t("home.stayUpToDate")}
          </h4>
          <p className="subTitle">
            {MokupHome.stayUpToDate.subTitle}
          </p>
          <div className="iframeContainer">
            <iframe src={MokupHome.stayUpToDate.link}></iframe>
          </div>
        </section>
        {/* sezione storia  */}
        <section className="history">
          <h4 className="title">
            {MokupHome.story.title}
          </h4>
          <p className="description">
            {MokupHome.story.description}
          </p>
          <div className="imageContainer">
            <img src={MokupHome.story.image} alt="story image" />
          </div>
        </section>
      </main>
      {/* footer e prefooter */}
      <PreFooter />
      <Footer />
    </div>
  )
}

export default Home
