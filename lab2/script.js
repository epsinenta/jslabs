window.onload = function () {
	let a = ''
	let b = ''
	let expressionResult = ''
	let selectedOperation = null

	const outputElement = document.getElementById('result')

	if (!outputElement) {
		return
	}

	document.querySelectorAll('[id^="btn_digit_"]').forEach(button => {
		button.onclick = function () {
			const digit = button.innerHTML
			if (!selectedOperation) {
				if (digit !== '.' || !a.includes('.')) a += digit
				outputElement.innerHTML = a
			} else {
				if (digit !== '.' || !b.includes('.')) b += digit
				outputElement.innerHTML = b
			}
		}
	})

	const operations = {
		btn_op_mult: 'x',
		btn_op_plus: '+',
		btn_op_minus: '-',
		btn_op_div: '/',
	}
	Object.keys(operations).forEach(id => {
		const btn = document.getElementById(id)
		btn.onclick = function () {
			if (a === '') return
			selectedOperation = operations[id]
		}
	})

	document.getElementById('btn_op_clear').onclick = function () {
		a = ''
		b = ''
		selectedOperation = ''
		expressionResult = ''
		outputElement.innerHTML = 0
	}

	document.getElementById('btn_op_backspace').onclick = function () {
		if (!selectedOperation) {
			a = a.slice(0, -1)
			outputElement.innerHTML = a || 0
		} else {
			b = b.slice(0, -1)
			outputElement.innerHTML = b || 0
		}
	}

	document.getElementById('btn_op_equal').onclick = function () {
		if (a === '') return делаем

		if (b === '') {
			b = lastB || a
		}

		switch (selectedOperation) {
			case 'x':
				expressionResult = +a * +b
				break
			case '+':
				expressionResult = +a + +b
				break
			case '-':
				expressionResult = +a - +b
				break
			case '/':
				if (+b === 0) {
					alert('Ошибка: деление на ноль!')
					return
				}
				expressionResult = +a / +b
				break
			default:
				return
		}

		lastB = b
		a = expressionResult.toString()
		b = ''
		outputElement.innerHTML = a
	}

	document.getElementById('btn_op_percent').onclick = function () {
		if (!selectedOperation) {
			a = (+a / 100).toString()
			outputElement.innerHTML = a
		} else {
			b = (+b / 100).toString()
			outputElement.innerHTML = b
		}
	}

	document.getElementById('btn_op_sqrt').onclick = function () {
		if (!selectedOperation) {
			a = Math.sqrt(+a).toString()
			outputElement.innerHTML = a
		}
	}

	document.getElementById('btn_op_square').onclick = function () {
		if (!selectedOperation) {
			a = Math.pow(+a, 2).toString()
			outputElement.innerHTML = a
		}
	}

	document.getElementById('btn_op_factorial').onclick = function () {
		function factorial(n) {
			return n === 0 ? 1 : n * factorial(n - 1)
		}
		if (!selectedOperation) {
			let num = parseInt(a)
			a = factorial(num).toString()
			outputElement.innerHTML = a
		}
	}

	document.getElementById('btn_digit_000').onclick = function () {
		if (!selectedOperation) {
			a += '000'
			outputElement.innerHTML = a
		} else {
			b += '000'
			outputElement.innerHTML = b
		}
	}

	document.getElementById('themeToggle').onclick = function () {
		document.body.classList.toggle('dark-theme')
	}

	document.getElementById('btn_op_minus_plus').onclick = function () {
		if (!selectedOperation) {
			a = (-a).toString()
			outputElement.innerHTML = a
		} else {
			b = (-b).toString()
			outputElement.innerHTML = b
		}
	}

	document.getElementById('btn_op_cube').onclick = function () {
		if (!selectedOperation) {
			a = Math.pow(+a, 3).toString()
			outputElement.innerHTML = a
		}
	}
	document.getElementById('resultColorToggle').onclick = function () {
		console.log('Смена цвета окна результата')
		outputElement.classList.toggle('alt-result-color')
	}
}
