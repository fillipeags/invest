import React, { useEffect, useState } from 'react';
import { FiTrash } from "react-icons/fi";
import api from '../../services/api';
import '../../styles.css'

function Brokers(){
	const [brokers, setBrokers] = useState([])

	const [id, setId] = useState('');
	const [name, setName] = useState('');

	const handleId = (event) => { setId(event.target.value)};
	const handleName = (event) => { setName(event.target.value)};

	async function handleSubmit(e){
		const data = {
			id,name
		};
		await api.post('/brokers', data);
		setBrokers([...brokers, data]);
		e.preventDefault();
	}

	useEffect(() => {
		api.get('/brokers').then(response => setBrokers(response.data))
	}, [])

	const handleDelete = (id) => {
		api.delete(`brokers/${id}`).then(setBrokers(brokers.filter(broker => broker.id !== id)))
	}

	return (
		<>
		<div className="container">
			<h3>CORRETORAS</h3>
			<table>
				<thead>
					<tr>
						<th>CNPJ</th>
						<th>Nome</th>
						<th>DELETAR</th>
					</tr>
				</thead>

				<tbody>
					{brokers.map(broker => (
						<tr key={broker.id}>
							<td>{broker.id}</td>
							<td>{broker.name}</td>
							<td>
								<button className="btn" onClick={() => handleDelete(broker.id)}><FiTrash/></button>
							</td>
						</tr>
					))}
				</tbody>
			</table>


			<br/>
		</div>

	  <div className="container">
			<h3>ADICIONAR CORRETORA</h3>
		<form onSubmit={handleSubmit} className="submit-form">
			<label>CNPJ: <input type="text" value={id} onChange={handleId} placeholder="ex: 41612452345243"/></label>
			<label>NOME: <input type="text" value={name} onChange={handleName} placeholder="ex: Rico Investimentos"/></label>
			<button type="submit" className="btn-sec">Adicionar</button>
			</form>
		</div>
		</>
	)
}

export default Brokers;
