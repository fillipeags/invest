import React, { useEffect, useState } from 'react';
import { FiTrash } from "react-icons/fi";
import Moment from 'moment';
import api from '../../services/api';
import '../../styles.css'

function Transactions(){

	Moment.locale('pt-br')

	const [transactions, setTransactions] = useState([])

	const [type, setType] = useState('');
	const [price, setPrice] = useState();
	const [quantity, setQuantity] = useState();
	const [id_broker, setId_Broker] = useState('');
	const [id_company, setId_Company] = useState('');

	const handleType = (event) => { setType(event.target.value)};
	const handlePrice = (event) => { setPrice(event.target.value)};
	const handleQuantity = (event) => { setQuantity(event.target.value)};
	const handleId_b = (event) => { setId_Broker(event.target.value)};
	const handleId_c = (event) => { setId_Company(event.target.value)};

	async function handleSubmit(e){
		const data ={
			type, price, quantity, id_broker, id_company
		};
		await api.post('transactions', data);
		setTransactions([...transactions, data])
	}

	useEffect(() => {
		api.get('/transactions').then(response => setTransactions(response.data))
	}, [])

	const handleDelete = (id) => {
		api.delete(`transactions/${id}`).then(setTransactions(transactions.filter(transaction => transaction.id !== id)))
	}


	return (
		<>
		<div className="container">
			<table>
				<thead>
					<tr>
						<th>Type</th>
						<th>Date</th>
						<th>Price</th>
						<th>Quantity</th>
						<th>Company</th>
						<th>Broker</th>
						<th>Action</th>

					</tr>
				</thead>

				<tbody>
					{transactions.map(transaction => (
						<tr key={transaction.id}>
							<td>{transaction.type}</td>
							<td>{Moment(transaction.date).format('lll')}</td>
							<td>{transaction.price}</td>
							<td>{transaction.quantity}</td>
							<td>{transaction.id_company}</td>
							<td>{transaction.id_broker}</td>
							<td>
								<button className="btn" onClick={() => handleDelete(transaction.id)}><FiTrash/></button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>

		<div className="container">
			<form onSubmit={handleSubmit} className="submit-form">
			<label>Tipo: <input type="text" value={type} onChange={handleType} /></label>
			<label>Preço: <input type="number" value={price} onChange={handlePrice} /></label>
			<label>Quantidade: <input type="number" value={quantity} onChange={handleQuantity} /></label>
			<label>Id da Corretora: <input type="text" value={id_broker} onChange={handleId_b} /></label>
			<label>Código da açao: <input type="text" value={id_company} onChange={handleId_c} /></label>
			<button type="submit" className="btn-sec">Adicionar</button>
			</form>
		</div>
		</>
	)
}

export default Transactions;
