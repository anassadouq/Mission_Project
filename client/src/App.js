import React, { Component } from "react"
import Liste from './Components/Liste';
import Create from './Components//Create';
import Update from './Components/Update';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

class App extends Component{
    render(){
        return(
            <Router>
                <Routes>
                    <Route path='/' element={<Liste/>}/>
                    <Route path='/create' element={<Create/>}/>
                    <Route path='/update/:id' element={<Update/>}/>
                </Routes>
            </Router>
        )
    }
}
export default App;