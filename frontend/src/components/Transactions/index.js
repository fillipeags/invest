import React, { useEffect, useState } from 'react';
import { FiTrash } from "react-icons/fi";
import Moment from 'moment';
import api from '../../services/api';
import '../../styles.css'

function Transactions(){

	Moment.locale('pt-br')

	const [transactions, setTransactions] = useState([])


	useEffect(() => {
		api.get('/transactions').then(response => setTransactions(response.data))
	}, [])

	const handleDelete = (id) => {
		api.delete(`transactions/${id}`).then(setTransactions(transactions.filter(transaction => transaction.id !== id)))
	}


	return (
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
	)
}

export default Transactions;
