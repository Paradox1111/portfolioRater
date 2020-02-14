import React from "react";

import Button from "react-bootstrap/Button";
// import Col from "react-bootstrap/Col";
// import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

function Home(props) {
	const { ports, user } = props;

	function deletePortfolio(e) {
		console.log(e.target.id);
		fetch(
			`https://portfolio-rater.herokuapp.com/api/portfolios/delete/${e.target.id}`,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json"
				}
			}
		).then(response =>
			response.json().then(json => {
				console.log(json);
			})
		);
	}

	let portElems = ports.map(port => {
		let comments = port.posts.map(comment => {
			return <li>{comment}</li>;
		});
		return (
			<div key={port._id}>
				<img src={port.imageUrl} />
				<br />
				<h4>{port.name}</h4>
				<h3>{port.title}</h3>
				<p>{port.description}</p>
				<ul>{comments}</ul>
				<Button href={port.link}>Visit portfolio</Button>
				{true && (
					<div>
						<Button>Edit</Button>
						<Button id={port._id} onClick={deletePortfolio}>
							Delete
						</Button>
					</div>
				)}
			</div>
		);
	});

	if (portElems) {
		return <Container className="Home">{portElems}</Container>;
	} else {
		return <h1>No portfolios found?</h1>;
	}
}

export default Home;
