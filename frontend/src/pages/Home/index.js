import React from 'react';
// import Container from '@material-ui/core/Container';
// import Typography from '@material-ui/core/Typography';
// import {Button,  Paper} from '@material-ui/core'

import api from '../../services/api';

import './styles.css'

function Home(){

	let [responseData, setResponseData] = React.useState('')
    // fetches data
    const fetchData = (e) => {
        e.preventDefault()
        api.get('/brokers')
        .then((response)=>{
            setResponseData(response.data)
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return (
        <div>
            <h1>{responseData.title}</h1>
            <button onClick={(e) => fetchData(e)} type='button'>Click Me For Data</button>
            {responseData.dates && responseData.dates.map(name => {
                return <p>{name}</p>
            })}
        </div>
    )
}

export default Home;
