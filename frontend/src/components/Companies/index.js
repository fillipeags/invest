import React, { useEffect, useState } from 'react';
import { FiTrash } from "react-icons/fi";
import api from '../../services/api';
import '../Companies/styles.css'

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

	let total = companies.reduce(function(prev, cur) {
		return prev + cur.total_stocks*cur.stock_average_price;
	}, 0);
	console.log(total)


	return (
		<>
		<div id="page-company">
			<div className="container">
				<h3>EMPRESAS</h3>
				<table>
					<thead>
						<tr>
							<th>Código</th>
							<th>Nome</th>
							<th>Campo</th>
							<th>Preço Médio</th>
							<th>Qtd AÇÕES</th>
							<th>%</th>
							<th>DELETAR</th>
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
								<td>{(100*(company.total_stocks*company.stock_average_price/total)).toFixed(1)}%</td>
								<td>
									<button className="btn" onClick={() => handleDelete(company.id)}><FiTrash/></button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div className="container">
				<h3>ADICIONAR EMPRESA</h3>
				<form onSubmit={handleSubmit} className="submit-form">
				<label>CÓDIGO: <input type="text" value={id} onChange={handleId}/></label>
				<label>NOME: <input type="text" value={name} onChange={handleName}/></label>
				<label>FIELD: <input type="text" value={field} onChange={handleField} /></label>
				<button type="submit" className="btn-sec">Adicionar</button>
				</form>
			</div>
		</div>
		</>
	)
}

export default Companies;
