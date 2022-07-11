
const player = (name, token) => {

	const getToken = () => {
		return token;
	}
	const getName = () => {
		return name;
	}

	return { name, token };
};


const gameBoard = (() => {
	const board = ['', '', '', '', '', '', '', '', ''];

	const setField = (index, token) => {
		console.log(`set ${index} to ${token}`);
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

	
})();


const gameController = (() => {
	const p1 = player('Player 1', 'x');
	const p2 = player('Player 2', 'o');
	let round = 1;
	let currentP = p1;
	
	const $player1 = document.querySelector('[data-player-id="1"]');
	const $player2 = document.querySelector('[data-player-id="2"]');
	const $currentPlayer = document.querySelector('[data-player-name]');
	
	const updateCurrentPlayer = () => {
		if ( 0 === round % 2 ) {
			currentP = p2;
		} else {
			currentP = p1;
		}
		$currentPlayer.innerText = getCurrentPlayerName();
		console.log(currentP);
		console.log(getCurrentPlayerToken());

	}

	const getCurrentPlayer = () => {
		console.log(currentP);
		return currentP;
	}

	const getCurrentPlayerToken = () => {
		return currentP.token;
	}
	
	const getCurrentPlayerName = () => {
		return currentP.name;
	}

	const playGame = (index) => {
		gameBoard.setField(index, getCurrentPlayerToken());
		round++;
		updateCurrentPlayer();
	}

	const resetGame = () => {
		round = 1;
		updateCurrentPlayer();
	}

	updateCurrentPlayer();

	$player1.querySelector('[data-name]').innerText = p1.name;
	$player1.querySelector('[data-token]').innerText = p1.token;
	
	$player2.querySelector('[data-name]').innerText = p2.name;
	$player2.querySelector('[data-token]').innerText = p2.token;

	return { playGame, resetGame };

})();

