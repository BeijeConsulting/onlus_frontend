// react import
import { useState,useEffect, FC } from "react"
// traduzioni
import { useTranslation } from "react-i18next"
// mediaquery
import { useMediaQuery } from "react-responsive"
// componenti
import Hero from "../components/hooks/Hero/Hero"
import Footer from "../components/footer/Footer"
import PreFooter from "../components/preFooter/PreFooter"
import CardEventsMobile from "../components/cardEvents/CardEventsMobile"
import CardArticle from "../components/cardArticle/CardArticle"

// style
import '../styles/home.scss'
import Header from "../components/hooks/Header/Header"


// mokup home (il json reale sarà diverso)
const MokupHome = {
  hero: {
    title: "Salva i panda dai bambù",
    subtitle: "Loremfzdsoifgzdsoihgfzdsoigfdzsoifghzdsoigfhziofgz",
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
    link: 'https://www.wwf.it/'
  },
  story: {
    title: 'Storia...',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos architecto consequuntur ab quasi nostrum rem error numquam! Error laborum sit iusto fugit, doloribus doloremque quos repellendus minima. Architecto, sequi adipisci.',
    image: 'https://leganerd.com/wp-content/uploads/2016/10/pandas-live_64dff22c2fe56e9-999x562.jpg'
  }
}

// definisco typo evento
type Event = {
  title: string
  image: string
  description: string
  requirement: string
  date: string
  time: string
  place: string
}

// mokup eventi
const EVENTI: Array<Event> = [
  {
    title: "Save the planet",
    image: "https://www.plasticfreeonlus.it/seo/plastic-free-raccolta-fb.jpeg",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi vero culpa velit magni aliquam. Voluptas non ullam quo temporibus aut, cum, sequi eaque recusandae iusto praesentium cumque omnis laudantium, saepe labore! Odio dicta tenetur, enim laboriosam quidem libero vel ipsam animi vitae ducimus aperiam magni fuga, ex cumque repudiandae eaque?",
    requirement:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi vero culpa velit magni aliquam. Voluptas non ullam quo temporibus aut, cum, sequi eaque recusandae iusto praesentium cumque omnis laudantium, saepe labore! Odio dicta tenetur, enim laboriosam quidem libero vel ipsam animi vitae ducimus aperiam magni fuga, ex cumque repudiandae eaque?",
    date: "4 ottobre 2022",
    time: "h 12.00",
    place: "Milano"
  },
  {
    title: "Un gancio in cielo",
    image:
      "https://www.congiulia.com/wp-content/uploads/2022/03/IMG-20220329-WA0008.jpg",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi vero culpa velit magni aliquam. Voluptas non ullam quo temporibus aut, cum, sequi eaque recusandae iusto praesentium cumque omnis laudantium, saepe labore! Odio dicta tenetur, enim laboriosam quidem libero vel ipsam animi vitae ducimus aperiam magni fuga, ex cumque repudiandae eaque?",
    requirement: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. ",
    date: "12 ottobre 2022",
    time: "h 12.00",
    place: "Milano"
  },
  {
    title: "United for the heart",
    image:
      "http://incodaalgruppo.gazzetta.it/files/2022/03/United-Onlus-evento-21-marzo-2022-Milano-500x506.jpeg",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi vero culpa velit magni aliquam. Voluptas non ullam quo temporibus aut, cum, sequi eaque recusandae iusto praesentium cumque omnis laudantium, saepe labore! Odio dicta tenetur, enim laboriosam quidem libero vel ipsam animi vitae ducimus aperiam magni fuga, ex cumque repudiandae eaque?",
    requirement: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. ",
    date: "12 ottobre 2022",
    time: "h 12.00",
    place: "Milano"
  },
]


const articles = [
  {
    id: 1,
    name: "riccardo",
    surname: "bottoli",
    email: "aletia@milan.it",
    date: Date.now(),
    title: "amare il prossimo",
    status: "published",
    cover: 'https://cdn.pixabay.com/photo/2016/11/29/12/13/fence-1869401_960_720.jpg',
    categories: ["buongiorismo", "religione", "scemenze"],
    content: [
      {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in sem vitae leo consequat convallis. Duis fermentum euismod dui, sollicitudin rutrum purus. Proin posuere commodo mollis. Nam finibus pretium risus. Quisque vel maximus risus. Donec ultrices leo id aliquam hendrerit. Proin gravida dui id nulla venenatis suscipit. Morbi scelerisque tincidunt velit, bibendum dignissim velit sagittis ut. Suspendisse semper tincidunt odio, eget laoreet justo aliquet nec. Duis ut nunc posuere, tincidunt nulla sit amet, ultrices sapien. Quisque a pretium est. Nam malesuada convallis ipsum, sed volutpat ante accumsan nec. Donec ultrices scelerisque posuere.",
        media: null,
      },
    ],
  },
  {
    id: 2,
    name: "riccardo",
    surname: "bottoli",
    email: "aletia@milan.it",
    date: Date.now(),
    title: "i panda",
    status: "published",
    cover:'https://cdn.pixabay.com/photo/2013/05/15/09/12/tourist-attraction-111329_960_720.jpg',
    categories: ["animali", "protezione", "scemenze"],
    content: [
      {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in sem vitae leo consequat convallis. Duis fermentum euismod dui, sollicitudin rutrum purus. Proin posuere commodo mollis. Nam finibus pretium risus. Quisque vel maximus risus. Donec ultrices leo id aliquam hendrerit. Proin gravida dui id nulla venenatis suscipit. Morbi scelerisque tincidunt velit, bibendum dignissim velit sagittis ut. Suspendisse semper tincidunt odio, eget laoreet justo aliquet nec. Duis ut nunc posuere, tincidunt nulla sit amet, ultrices sapien. Quisque a pretium est. Nam malesuada convallis ipsum, sed volutpat ante accumsan nec. Donec ultrices scelerisque posuere.",
        media: null,
      },
    ],
  },
  {
    id: 3,
    name: "riccardo",
    surname: "bottoli",
    email: "aletia@milan.it",
    date: Date.now(),
    title: "riccardo",
    status: "published",
    cover: 'https://cdn.pixabay.com/photo/2019/04/04/15/17/smartphone-4103051_960_720.jpg',
    categories: ["barba", "occhiali", "scemenze"],
    content: [
      {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in sem vitae leo consequat convallis. Duis fermentum euismod dui, sollicitudin rutrum purus. Proin posuere commodo mollis. Nam finibus pretium risus. Quisque vel maximus risus. Donec ultrices leo id aliquam hendrerit. Proin gravida dui id nulla venenatis suscipit. Morbi scelerisque tincidunt velit, bibendum dignissim velit sagittis ut. Suspendisse semper tincidunt odio, eget laoreet justo aliquet nec. Duis ut nunc posuere, tincidunt nulla sit amet, ultrices sapien. Quisque a pretium est. Nam malesuada convallis ipsum, sed volutpat ante accumsan nec. Donec ultrices scelerisque posuere.",
        media: null,
      },
    ],
  },
  {
    id: 4,
    name: "riccardo",
    surname: "bottoli",
    email: "aletia@milan.it",
    date: Date.now(),
    title: "luca",
    status: "published",
    cover: 'https://cdn.pixabay.com/photo/2014/04/05/09/30/tablet-314153_960_720.png',
    categories: ["champagne", "pelato", "rasato"],
    content: [
      {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in sem vitae leo consequat convallis. Duis fermentum euismod dui, sollicitudin rutrum purus. Proin posuere commodo mollis. Nam finibus pretium risus. Quisque vel maximus risus. Donec ultrices leo id aliquam hendrerit. Proin gravida dui id nulla venenatis suscipit. Morbi scelerisque tincidunt velit, bibendum dignissim velit sagittis ut. Suspendisse semper tincidunt odio, eget laoreet justo aliquet nec. Duis ut nunc posuere, tincidunt nulla sit amet, ultrices sapien. Quisque a pretium est. Nam malesuada convallis ipsum, sed volutpat ante accumsan nec. Donec ultrices scelerisque posuere.",
        media: null,
      },
    ],
  },
  {
    id: 5,
    name: "riccardo",
    surname: "bottoli",
    email: "aletia@milan.it",
    date: Date.now(),
    title: "mattia",
    status: "published",
    cover:  'https://cdn.pixabay.com/photo/2016/02/07/16/35/world-1185076_960_720.png',
    categories: ["calcio", "ciuffo", "sbagliato"],
    content: [
      {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in sem vitae leo consequat convallis. Duis fermentum euismod dui, sollicitudin rutrum purus. Proin posuere commodo mollis. Nam finibus pretium risus. Quisque vel maximus risus. Donec ultrices leo id aliquam hendrerit. Proin gravida dui id nulla venenatis suscipit. Morbi scelerisque tincidunt velit, bibendum dignissim velit sagittis ut. Suspendisse semper tincidunt odio, eget laoreet justo aliquet nec. Duis ut nunc posuere, tincidunt nulla sit amet, ultrices sapien. Quisque a pretium est. Nam malesuada convallis ipsum, sed volutpat ante accumsan nec. Donec ultrices scelerisque posuere.",
        media: null,
      },
    ],
  }
]

const Home: FC = () => {

  // inizializzo traduzioni
  const { t }: any = useTranslation()
  const [state,setState]=useState({articlesArray:articles})

  useEffect(()=>{
    getArticles()
  },[])

  const getArticles=():void=>{
    setState({articlesArray:articles})
  }

  const mapArticles=(item:any, key:number)=>{
    return(
      <article key={key}>
        <CardArticle title={item.title} description={item.content[0].text} date={item.date} image={item.cover}/>
      </article>
    )
  }

  // map degli eventi
  const mapEvents = (event: Event, key: number): JSX.Element => {
    return (
      <article key={key}>
          <CardEventsMobile
            title={event.title}
            description={event.description}
            image={event.image}
            requirement={event.requirement}
            time={event.time}
            date={event.date}
            place={event.place}
            minWidth={'330px'}
          />
      </article>
    )
  }


  return (
    <div id="home">
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
          <h4 className="title">
            {t("titles.eventsTitle")}
          </h4>
          <div className="articleContainer">
            {EVENTI.map(mapEvents)}
          </div>
        </section>
        {/* sezione articoli blog */}
        <section className="articles">
          <h4 className="title">
            {t("home.latestNews")}
          </h4>
          <div className="articlesContainer">
            {state.articlesArray.map(mapArticles)}
          </div>
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
