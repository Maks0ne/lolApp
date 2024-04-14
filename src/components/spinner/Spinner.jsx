import spinnerImg from '../../assets/animation/spinner.gif'
import './spinner.scss'

const Spinner = () => {
  return (
    <div className='spinner'>
      <p>Loading...</p>
      <img src={spinnerImg} alt="Spinner" />
    </div>
  )
}

export default Spinner