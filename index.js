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

	const $player1 = document.querySelector('[data-player-id="1"]');
	const $player2 = document.querySelector('[data-player-id="2"]');
	const $message = document.querySelector('[data-message]');

	for (const space of $spaces) {
		space.addEventListener('click', (e) => {
			e.preventDefault();
			const index = space.dataset.index;
			gameController.playGame(index);
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

	const setPlayerInfo = (p1, p2) => {
		$player1.querySelector('[data-name]').innerText = p1.getName();
		$player1.querySelector('[data-token]').innerText = p1.getToken();

		$player2.querySelector('[data-name]').innerText = p2.getName();
		$player2.querySelector('[data-token]').innerText = p2.getToken();

	}

	return { setPlayerInfo, setMessage };
})();


const gameController = (() => {
	const p1 = player('Player 1', 'x');
	const p2 = player('Player 2', 'o');
	let round = 1;

	const getCurrentPlayerToken = () => {
		return round % 2 === 1 ? p1.getToken() : p2.getToken();
	}
	
	const getCurrentPlayerName = () => {
		return round % 2 === 1 ? p1.getName() : p2.getName();
	}

	const playGame = (index) => {
		checkWinner(index);
		gameBoard.setField(index, getCurrentPlayerToken());
		round++;
		displayController.setMessage(`${getCurrentPlayerName()}'s Turn`);
	}

	const checkWinner = (index) => {
		// TODO: determine winner
		console.log('checking winner');
	}

	const resetGame = () => {
		round = 1;
		displayController.setMessage(`${getCurrentPlayerName()}'s Turn`);
	}

	displayController.setPlayerInfo(p1, p2);
	displayController.setMessage(`${getCurrentPlayerName()}'s Turn`);

	return { playGame, resetGame, getCurrentPlayerName };

})();



