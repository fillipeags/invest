import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import './styles.css'

function Home(){

	const [brokers, setBrokers] = useState([])


	useEffect(() => {
		api.get('/brokers').then(response => setBrokers(response.data))
	}, [])

	return (
		<div className="container">
			<table>
				<thead>
					<tr>
						<th>CNPJ</th>
						<th>Nome Corretora</th>
						<th>Action</th>
					</tr>
				</thead>

				<tbody>
					{brokers.map(broker => (
						<tr key={broker.id}>
							<td>{broker.id}</td>
							<td>{broker.name}</td>
							<td>
								<button className="btn-secondary" >Deletar</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>


			<br/>

			<table className="addBroker">
				<tbody>
					<tr>
						<td><input type="text"/></td>
						<td><input type="text"/></td>
						<td><button className="btn-secondary">Adicionar</button></td>
					</tr>
				</tbody>
			</table>


		</div>
	)
}

export default Home;
