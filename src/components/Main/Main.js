import React, {useEffect} from 'react';
import css from './main.module.css'
import {NavLink, useSearchParams} from "react-router-dom"
import {getCats, moreCats} from "../../store/slices/catsSlice";
import {useDispatch} from "react-redux";

const Main = ({catsArray , status , page}) => {

    console.log(status)

    const [searchParams] = useSearchParams();

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCats({page : page , categoryID : searchParams.get('category_id') }))

    }, [searchParams.get('category_id') , page])

    return (
        <div className={css.main}>
            {searchParams.get('category_id') ?
                status ?
                <div>
                    <h1>Cats</h1>
                    <ul>
                        {
                            catsArray.map(({id, url}, index) => {
                                return <li key={index}>
                                    <img
                                        src={url}
                                        height={250}
                                        alt="cats"
                                        // style={{animationDelay: index / 8 + 's'}}
                                    />
                                </li>
                            })
                        }
                    </ul>
                    <button onClick={() => dispatch(moreCats())}>
                        More Cats
                    </button>
                </div>
                    : <div>
                        <h1>Loading</h1>
                    </div>
                :
                <div>
                    <h1>Please choose category</h1>
                </div>}
        </div>
    );
};

export default Main;