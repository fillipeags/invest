import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import './styles.css'

function Home(){

	const [brokers, setBrokers] = useState([])

	useEffect(() => {
		api.get('/brokers')
		.then(response => setBrokers(response.data.brokers))
	}, [])

	return (
		<table>
			<thead>
				<tr>
					<th>CNPJ</th>
					<th>Nome Corretora</th>
				</tr>
			</thead>

			<tbody>
				{brokers.map(broker => (
					<tr key={broker.id}>
						<td>{broker.id}</td>
						<td>{broker}</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}

export default Home;
