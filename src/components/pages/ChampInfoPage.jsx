import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useHttp } from "../../hooks/useHttp.js";
import { imgApi, skillsApi, passiveApi, championsListApi } from "../../config/RiotApi";
import Spinner from '../spinner/Spinner';

import './champInfoPage.scss'

const ChampInfoPage = () => {

  const [champion, setChampion] = useState(null);
  const [showLoading, setShowLoading] = useState(true);

  const { champName } = useParams();
  const apiURL = `${championsListApi}/champion/${champName}.json`;
  const { fetchData, data, loading, error } = useHttp(apiURL);

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
              <div className='skill-item'>
                <img className='skill-image' src={`${passiveApi}${champion.passive.image.full}`} alt={champion.passive.name} />
                <p>{champion.passive.name} </p>
              </div>
              <div className='skill-item'>
                <img className='skill-image' src={`${skillsApi}${champion.spells[0].image.full}`} alt={champion.spells[0].name} />
                <p>{champion.spells[0].name}</p>
              </div>
              <div className='skill-item'>
                <img className='skill-image' src={`${skillsApi}${champion.spells[1].image.full}`} alt={champion.spells[1].name} />
                <p>{champion.spells[1].name}</p>
              </div>
              <div className='skill-item'>
                <img className='skill-image' src={`${skillsApi}${champion.spells[2].image.full}`} alt={champion.spells[2].name} />
                <p>{champion.spells[2].name}</p>

              </div>
              <div className='skill-item'>
                <img className='skill-image' src={`${skillsApi}${champion.spells[3].image.full}`} alt={champion.spells[3].name} />
                <p>{champion.spells[3].name}</p>

              </div>
            </div>
            <Link to={'/'}><button className='btn'>Go back</button></Link>
          </div>
        </div>
      )}
      {!champion && !loading && !error &&
        <div className="not-found">
          <p>Champion not found</p>
          <Link to='/'><button className='btn'>Go back</button></Link>
        </div>}
    </div>
  );
}


export default ChampInfoPage;

