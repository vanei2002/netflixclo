import React, { useEffect, useState } from "react";
import Tmdb from "./Tmdb";
import MovieRow from "./cmd/MovieRow";
import FeaturedMovie from "./cmd/FeaturedMovie";
import './App.css'
import Header from "./cmd/Header";


export default () => {
  const [featuredData, setFeaturedData] = useState(null)
  const [movieList, setMovieList] = useState([]);//Inicia com Array vazio 
  const [blackHeader, setBlackHeader] = useState(true)
  // useEffect = quando iniciar

  useEffect(() => {
    const loadAll = async () => {
      //Pegar a lista dos filmes

      let list = await Tmdb.getHomeList();
      setMovieList(list)
      // console.log(list )

      //Pega o filme em destaque

      let originals = list.filter(i=>i.slug === 'Originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length));
      let chosen = originals[0].items.results[randomChosen];
      // console.log(chosen )

      let choseInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(choseInfo);
     

    }

    loadAll();
  }, []);

  useEffect(() =>{
    	const scrollListener = () =>{

        if(window.scrollY > 100){
          setBlackHeader(true)
        }else{
          setBlackHeader(false)
        }
      }

      window.addEventListener('scroll', scrollListener);
      return () => {
        window.removeEventListener('scroll', scrollListener);
      }
  }, []);

  return(

    <div className='page'>

      <Header black={blackHeader}/>

      {featuredData&&
      <FeaturedMovie item={featuredData}/>}

      <section className="lists">
        {movieList.map((item, key)=>(
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

      <footer>
        <strong>

        Feito com muita dedicação <span role="img">🥰🥰</span>, apenas para fiz de estudo.<br/>
        Direitos de imagens para Netflix <br/>
        Dados pegos do site Themoviedb.org
        </strong>
      </footer>

    </div>
  )
}

