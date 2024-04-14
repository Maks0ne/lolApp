import img404 from '../../assets/images/404.jpeg'

const Page404 = () => {

  return (
    <div style={{
      backgroundImage: `url(${img404})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: '100',
    }}>
    </div>

  )
}

export default Page404
