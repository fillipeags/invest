import React, { useEffect, useState } from 'react';
import { FiTrash } from "react-icons/fi";
import api from '../../services/api';
import '../../styles.css'

function Companies(){

	const [companies, setCompanies] = useState([])

	useEffect(() => {
		api.get('/companies').then(response => setCompanies(response.data))
	}, [])

	return (
		<div className="container">
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Field</th>
						<th>Average Price</th>
						<th>Stocks total</th>
						<th>Action</th>
					</tr>
				</thead>

				<tbody>
					{companies.map(company => (
						<tr key={company.id}>
							<td>{company.id}</td>
							<td>{company.name}</td>
							<td>{company.field}</td>
							<td>{company.stock_average_price}</td>
							<td>{company.total_stocks}</td>
							<td>
								<button className="btn" ><FiTrash/></button>
							</td>
						</tr>
					))}
				</tbody>
			</table>


			<br/>

			{/* <table className="addBroker">
				<tbody>
					<tr>
						<td><input type="text"/></td>
						<td><input type="text"/></td>
						<td><button className="btn-secondary">Adicionar</button></td>
					</tr>
				</tbody>
			</table> */}


		</div>
	)
}

export default Companies;
