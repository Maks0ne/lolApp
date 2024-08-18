import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useHttp } from "../../hooks/useHttp.js";
import Spinner from "../spinner/Spinner.jsx";
import ErrorMessage from '../errorMessage/ErrorMessage';
import { ThemeContext } from '../../providers/ThemeProvider'
import { ChevronsUp } from 'lucide-react'
import './championList.scss'
import { imgApi, championsListApi } from "../../config/RiotApi";
import ImagesClass from "./ImageClass.jsx";
import logo from '../../assets/images/LeagueOfLegendsLogo.png'

const ChampionsList = () => {

  const { fetchData, data, loading, error } = useHttp(`${championsListApi}/champion.json`);
  const [champions, setChampions] = useState([]);
  const [offset, setOffset] = useState(20);
  const [ended, setEnded] = useState(false)
  const [showLoading, setShowLoading] = useState(true)
  const [theme] = useContext(ThemeContext)

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      const championsData = Object.values(data.data);
      setChampions(prevChampions => [...prevChampions, ...championsData]);
    }
  }, [data])

  useEffect(() => {
    const spinnerTimeout = setTimeout(() => {
      setShowLoading(false)
    }, 1500)
    return () => clearTimeout(spinnerTimeout);
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [offset]);

  const handleScroll = (event) => {
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
      loadMoreChampions(offset);
      event.preventDefault();
    }
  }

  const loadMoreChampions = async () => {

    if (offset < 163) {
      setOffset(offset + 5);
      // await fetchData();
    } else if (offset < 165) {
      setOffset(offset + 1);
      // await fetchData();
    } else {
      setEnded(true)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  const getImageForChampion = (tags) => {
    const images = tags.map(tag => ImagesClass[tag]).filter(image => image);
    return images;
  };

  const isLoading = loading ? <Spinner /> : null
  const firstLoad = showLoading ? <Spinner /> : null
  const errorMessage = error ? <ErrorMessage /> : null


  return (
    <>
      <div className="champions-list">
        <img className='logo' src={logo} alt="League of Legends" />
        {errorMessage}

        <ul className="champions-wrapper">
          {champions.slice(0, offset).map(champion => (
            <li key={champion.key} className="champion-item">
              <Link to={`/champion/${champion.name}`}>
                <img
                  className="champion-image"
                  src={`${imgApi}${champion.id}_0.jpg`}
                  alt={champion.name}
                />
                <div className="champion-name">{champion.name}<br />
                  <span>{champion.title.length > 25 ? champion.title.substring(0, 25) + '...' : champion.title}</span>
                </div>
                <div className="champions-class-container">
                  {champion.tags && getImageForChampion(champion.tags).map((image, index) => (
                    <img
                      key={index}
                      className="champion-class-image"
                      src={image}
                      alt={`class-${champion.tags[index]}`}
                    />
                  ))}
                  <div>
                    <p className="champion-class-name">{champion.tags[0]}</p>
                    <p className="champion-class-name">{champion.tags[1]}</p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <button onClick={scrollToTop} className='arrow'>{theme === 'dark' ? <ChevronsUp color="#3e9392" /> : <ChevronsUp color="#f0dcb4" />}</button>
      </div>
      {isLoading}
      {firstLoad}
      {ended && <div className="ended"><p>No more champions to load</p></div>}
    </>
  );
}

export default ChampionsList;
