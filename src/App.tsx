import React from 'react'
import { Provider } from 'react-redux'
import { Container, Row, Col } from 'reactstrap'
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import store from './store'

import './App.scss'
import 'bootstrap/dist/css/bootstrap.min.css'

import FileUploader from './components/FileUploader'
import FileContent from './components/FileContent'
import Statistics from './components/Statistics'
import { GithubRibbon } from './components/GithubRibbon'

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <DragDropContextProvider backend={HTML5Backend}>
        <div className="App">
          <GithubRibbon />
          <Container>
            <Row>
              <h1 className="display-1 mb-4">G code analyzer</h1>
            </Row>
            <Row>
              <Col>
                <FileUploader />
                <FileContent />
              </Col>
              <Col>
                <Statistics />
              </Col>
            </Row>
          </Container>
        </div>
      </DragDropContextProvider>
    </Provider>
  )
}

export default App
