import React from 'react';
import css from './slidebar.module.css'
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import {moreCats} from "../../store/slices/catsSlice";

const Sidebar = ({categories , status , page}) => {

    const dispatch = useDispatch()

    return (
        <>
            <label className={css.label} htmlFor="check">Menu</label>
            <input id="check" className={css.input} type="checkbox"/>
            <nav className={css.sidebar}>
                <ul>
                    {
                        status ? categories.map(({id , name}) => {
                                return (
                                    <li key={id} onClick={() => dispatch(moreCats(1))}>
                                        <NavLink to={`/${name}?category_id=${id}`}>
                                            {name}
                                        </NavLink>
                                    </li>
                                )})
                            : <h2>Loading...</h2>
                    }
                </ul>
            </nav>
        </>

    );
};

export default Sidebar;