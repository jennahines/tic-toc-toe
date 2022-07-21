const player = (name, token) => {

	const getName = () => {
		return name;
	}

	const getToken = () => {
		return token;
	}
	
	return { getName, getToken };
};

const gameBoard = (() => {
	const board = ['', '', '', '', '', '', '', '', ''];

	const setField = (index, token) => {
		board[index] = token;
	}

	const getField = (index) => {
		return board[index];
	}

	const resetBoard = () => {
		for (let i = 0; i < board.length; i++) {
			board[i] = '';
		}
	}

	return { setField, getField, resetBoard };

})();


const displayController = (() => {
	const $spaces = document.querySelectorAll('.game-board-space');
	const $resetButton = document.getElementById('reset-button');

	const $message = document.querySelector('[data-message]');

	for (const space of $spaces) {
		space.addEventListener('click', (e) => {
			e.preventDefault();
			if ( gameController.isGameOver() || '' !== e.target.innerText ) return;

			const index = space.dataset.index;
			gameController.playGame(parseInt(index));
			updateGameBoard();
		});
	}

	$resetButton.addEventListener('click', (e) => {
		gameBoard.resetBoard();
		gameController.resetGame();
		updateGameBoard();
	});

	const updateGameBoard = () => {
		for ( let i = 0; i < $spaces.length; i++ ) {
			$spaces[i].innerText = gameBoard.getField(i);

			if ( '' !== $spaces[i]. innerText ) {
				$spaces[i].classList.add('filled');
			} else {
				$spaces[i].classList.remove('filled');
			}
		}
	};

	const setMessage = (message) => {
		if ( message ) {
			$message.innerText = message
		} else {
			$message.innerText = '';
		}
	}

	return { setMessage };
})();


const gameController = (() => {
	let p1 = null;
	let p2 = null;
	let round = 1;
	let gameOver = false;

	const $board = document.querySelector('#game-board');
	const $boardActions = document.querySelector('.game-board-actions');
	const $player1NameInput = document.querySelector('#player-1-name');
	const $player2NameInput = document.querySelector('#player-2-name');
	const $player1TokenInput = document.querySelector('#player-1-token');
	const $player2TokenInput = document.querySelector('#player-2-token');
	
	const $startGameButton = document.querySelector('[data-start-game]');

	$startGameButton.addEventListener('click', (e) => {
		e.preventDefault();
		if( '' !== $player1NameInput.value && '' !== $player2NameInput.value && '' !== $player1TokenInput.value && '' !== $player2TokenInput.value ) {

			if ( $player1TokenInput.value.toUpperCase() === $player2TokenInput.value.toUpperCase() ) {
				alert( 'Player 1 Token and Player 2 Token cannot be the same' );

			}
			else if ( $player1NameInput.value.toUpperCase() === $player2NameInput.value.toUpperCase() ) {
				alert( 'Player 1 Name and Player 2 Name cannot be the same' );

			} else {
				$board.removeAttribute('hidden');
				$boardActions.removeAttribute('hidden');
				p1 = player($player1NameInput.value, $player1TokenInput.value);
				p2 = player($player2NameInput.value, $player2TokenInput.value);
				displayController.setMessage(`${getCurrentPlayerName()}'s Turn`);
					

			}
		} else {
			alert( 'Please enter names and tokens for players' );
		}
	});

	const getCurrentPlayerToken = () => {
		return round % 2 === 1 ? p1.getToken() : p2.getToken();
	}
	
	const getCurrentPlayerName = () => {
		return round % 2 === 1 ? p1.getName() : p2.getName();
	}

	const playGame = (index) => {
		gameBoard.setField( index, getCurrentPlayerToken());
		if ( checkWinner( index ) ) {
			displayController.setMessage(`${getCurrentPlayerName()} is the winner`);
			gameOver = true;
			return;
		}
		if ( 9 === round ) {
			displayController.setMessage(`It's a draw!`);
			gameOver = true;
			return;
		}
		round++;
		displayController.setMessage(`${getCurrentPlayerName()}'s Turn`);
	}

	const checkWinner = (index) => {
		const winningCombinations = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];
		// console.log('checking winner');
		return winningCombinations
			.filter( combination => combination.includes( index ))
			.some( possibleCombination => possibleCombination.every(
				i => gameBoard.getField( i ) === getCurrentPlayerToken()
			)
		);
	}

	const resetGame = () => {
		round = 1;
		gameOver = false;
		displayController.setMessage(`${getCurrentPlayerName()}'s Turn`);
	}

	const isGameOver = () => {
		return gameOver;
	}

	return { playGame, resetGame, getCurrentPlayerName, isGameOver };

})();



