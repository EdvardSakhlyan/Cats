import React, {useEffect} from "react"
import Sidebar from "./components/Sidebar/Sidebar";
import Main from "./components/Main/Main";
import {useDispatch, useSelector} from "react-redux";
import './App.css'
import {getCategory, getCats} from "./store/slices/catsSlice";

function App() {

    const dispatch = useDispatch()

    const {
        categories : {categoriesArray , categoriesStatus },
        cats: {catsStatus, catsArray, page }
    } = useSelector(state => state.catsReducer)

    useEffect(() => {
        dispatch(getCategory())
    }, [])


  return (
    <div className="app">
      <Sidebar status={categoriesStatus} categories={categoriesArray} page={page}/>
      <Main status={catsStatus} catsArray={catsArray} page={page}/>
    </div>
  );
}

export default App;
