import { useContext } from 'react'
import { Moon } from 'lucide-react'
import { Sun } from 'lucide-react';
import { Github } from 'lucide-react'
import { ThemeContext } from '../../providers/ThemeProvider'
import './navigation.scss'

const Navigation = () => {

  const [theme, setTheme] = useContext(ThemeContext)

  const changeTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className='navigation'>
      <div className='top'>
        <button onClick={changeTheme}>
          {theme === 'dark' ? <Moon color="#3e9392" /> : <Sun color="#f0dcb4" />}
        </button>
        <a href="https://github.com/" target="_blank" rel="noopener noreferrer" >
          <button >{theme === 'dark' ? <Github color="#3e9392" /> : <Github color=" #f0dcb4" />}</button>

        </a>
      </div>
    </div>
  )
}

export default Navigation