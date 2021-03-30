import React, { useEffect, useState } from 'react';
import { FiTrash } from "react-icons/fi";
import api from '../../services/api';
import '../../styles.css'

function Companies(){

	const [companies, setCompanies] = useState([])

	const [id, setId] = useState('');
	const [name, setName] = useState('');
	const [field, setField] = useState('');

	const handleId = (event) => { setId(event.target.value)};
	const handleName = (event) => { setName(event.target.value)};
	const handleField = (event) => { setField(event.target.value)};

	async function handleSubmit(e){
		const data = {
			id,name, field
		};
		await api.post('/companies', data);
		setCompanies([...companies, data]);
		e.preventDefault();
	}

	useEffect(() => {
		api.get('/companies').then(response => setCompanies(response.data))
	}, [])

	const handleDelete = (id) => {
		api.delete(`companies/${id}`).then(setCompanies(companies.filter(company => company.id !== id)))
	}

	return (
		<>
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
								<button className="btn" onClick={() => handleDelete(company.id)}><FiTrash/></button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>

		<div className="container">
			<form onSubmit={handleSubmit} className="submit-form">
			<label>CÓDIGO: <input type="text" value={id} onChange={handleId} placeholder="somente números"/></label>
			<label>NOME: <input type="text" value={name} onChange={handleName} placeholder="Digite o nome da Corretora"/></label>
			<label>FIELD: <input type="text" value={field} onChange={handleField} placeholder="Digite o nome da Corretora"/></label>
			<button type="submit" className="btn-sec">Adicionar</button>
			</form>
		</div>
		</>
	)
}

export default Companies;
