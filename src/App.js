import React, { useState } from 'react';
import './App.css';

import Board from './components/Board';

const PLAYER_1 = 'X';
const PLAYER_1_NAME = 'PLAYER_1';
const PLAYER_2 = 'O';
const PLAYER_2_NAME = 'PLAYER_2';

const generateSquares = () => {
	const squares = [];

	let currentId = 0;

	for (let row = 0; row < 3; row += 1) {
		squares.push([]);
		for (let col = 0; col < 3; col += 1) {
			squares[row].push({
				id: currentId,
				value: '',
			});
			currentId += 1;
		}
	}

	return squares;
};

const App = () => {
	const [squares, setSquares] = useState(generateSquares());
	const [currentPlayer, changePlayer] = useState(PLAYER_1);
	const [winner, setWinner] = useState(null);

	const currentPlayerName = (PLAYER) => {
		return PLAYER === PLAYER_1 ? PLAYER_1_NAME : PLAYER_2_NAME;
	};

	const updateSquares = (id) => {
		if (winner !== null) return;

		const newSquares = [...squares];
		let row = 0;
		let col = 0;
		let found = false;

		while (row < 3 && !found) {
			while (col < 3 && !found) {
				const currentSquare = newSquares[row][col];
				if (currentSquare.id === id) {
					if (currentSquare.value !== '') return;
					found = true;
					currentSquare.value = currentPlayer;
					changePlayer(currentPlayer !== PLAYER_1 ? PLAYER_1 : PLAYER_2);
				}
				col += 1;
			}
			row += 1;
			col = 0;
		}
		setWinner(checkForWinner(newSquares));
		setSquares(newSquares);
	};

	const checkForWinner = (squares) => {
		const winConditions = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[6, 4, 2],
		];
		const squareList = squares.flatMap((row) => row.map((cell) => cell.value));

		for (const condition of winConditions) {
			const [a, b, c] = condition;

			if (squareList[a] && squareList[a] === squareList[b] && squareList[a] === squareList[c]) {
				return currentPlayerName(squareList[a]);
			}
		}

		return null;
	};

	const resetGame = () => {
		changePlayer(PLAYER_1);
		setWinner(null);
		setSquares(generateSquares());
	};

	return (
		<div className="App">
			<header className="App-header">
				<h1>React Tic Tac Toe</h1>
				{winner ? (
					<h2>{'The winner is ' + currentPlayerName(currentPlayer)}</h2>
				) : (
					<h2>{currentPlayerName(currentPlayer) + ' Turn'}</h2>
				)}
				<button onClick={resetGame}>Reset Game</button>
			</header>
			<main>
				<Board squares={squares} onClickCallback={updateSquares} />
			</main>
		</div>
	);
};

export default App;
