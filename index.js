
const player = (name, token) => {

	const getToken = () => {
		return token;
	}

	return { name, token };
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
		console.log('reset');
		for (let i = 0; i < board.length; i++) {
			board[i] = '';
		}
	}

	return { setField, getField, resetBoard };

})();


const displayController = (() => {
	const $spaces = document.querySelectorAll('.game-board-space');
	const $resetButton = document.getElementById('reset-button')


	$resetButton.addEventListener('click', (e) => {
		gameBoard.resetBoard();
	});
	
})();


const gameController = (() => {

})();

