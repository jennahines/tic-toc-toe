
const player = (name, token) => {

	const getToken = () => {
		return token;
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
		console.log('reset');
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
			if ( !space.classList.contains( 'filled' ) ) {
				gameBoard.setField(index, 'x');
				updateGameBoard();
			}
		});
	}

	$resetButton.addEventListener('click', (e) => {
		gameBoard.resetBoard();
		updateGameBoard();
	});

	const updateGameBoard = () => {
		for ( let i = 0; i < $spaces.length; i++ ) {
			$spaces[i].innerText = gameBoard.getField(i);
		}
	};

	
})();


const gameController = (() => {

})();

