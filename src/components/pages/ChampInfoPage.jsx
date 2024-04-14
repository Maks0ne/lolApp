import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useHttp } from "../../hooks/http.hook.js";
import { imgApi, skillsApi, passiveApi } from "../../config/RiotApi";
import Spinner from '../spinner/Spinner';

import './champInfoPage.scss'

const ChampInfoPage = () => {
  const { fetchData, data, loading, error } = useHttp();
  const [champion, setChampion] = useState(null);
  const [showLoading, setShowLoading] = useState(true)

  const { champName } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      const championsData = Object.values(data.data);
      const selectedChampion = championsData.find(champion => champion.name === champName);
      setChampion(selectedChampion);
    }
  }, [data, champName]);

  useEffect(() => {
    const spinnerTimeout = setTimeout(() => {
      setShowLoading(false)
    }, 1000)
    return () => clearTimeout(spinnerTimeout);
  }, [])

  const isLoading = loading ? <Spinner /> : null
  const firstLoad = showLoading ? <Spinner /> : null

  return (
    <div>
      {isLoading}
      {firstLoad}
      {champion && (
        <div className='champ-info'>
          <img className='champ-image' src={`${imgApi}${champion.id}_0.jpg`} alt={champion.name} />
          <div className='champ-wrapper'>
            <p className='name'>{champion.name}</p>
            <p className='title'>{champion.title}</p>
            <p>{champion.blurb}</p>
            <div className='skill-wrapper'>
              <img className='skill-image' src={`${passiveApi}${champion.id}_P.png`} alt='Passive' />
              <img className='skill-image' src={`${skillsApi}${champion.id}Q.png`} alt="Q" />
              <img className='skill-image' src={`${skillsApi}${champion.id}W.png`} alt="W" />
              <img className='skill-image' src={`${skillsApi}${champion.id}E.png`} alt="E" />
              <img className='skill-image' src={`${skillsApi}${champion.id}R.png`} alt="R" />
            </div>
            <Link to={'..'}><button className='btn'>Go back</button></Link>
          </div>
        </div>
      )}
      {!champion && !loading && !error &&
        <div className="not-found">
          <p>Champion not found</p>
          <button onClick={() => navigate(-1)} className='btn'>Go back</button>
        </div>}
    </div>
  );
}


export default ChampInfoPage;

