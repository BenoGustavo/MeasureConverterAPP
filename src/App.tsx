import { Header } from './components/header/Header'
import { Background, Wrapper } from './Styles'
import { Body } from './components/body/Body'
import { Provider } from 'react-redux'
import { store } from './redux/store'

function App() {

  return (
    <>
      <Provider store={store}>
        <Background>
          <Header />

          <Wrapper>
            <Body />
          </Wrapper>
        </Background>

      </Provider>
    </>
  )
}

export default App
