import { BackButtonComponent } from '../../components/back-button/index.js'
import { CaruselComponent } from '../../components/carusel/index.js'
import { MainPage } from '../main/index.js'
class BlueprintEntity {
	constructor(type, width, height, name, position) {
		this.type = type
		this.width = width
		this.height = height
		this.name = name
		this.position = position
	}
}

export class BlueprintPage {
	constructor(parent, id) {
		this.parent = parent
		this.id = id
		this.data = this.getData()
		this.blueprintElements = this.initBlueprintElements()
	}

	initBlueprintElements() {
		return this.data.elements.map(
			el =>
				new BlueprintEntity(el.type, el.width, el.height, el.name, el.position)
		)
	}

	getData() {
		const blueprints = [
			{
				id: 1,
				title: 'Секционная панель',
				elements: [
					{
						type: 'прямоугольник',
						width: 15,
						height: 5,
						name: 'Секция',
						position: { x: 10, y: 11 },
					},
					{
						type: 'прямоугольник',
						width: 6,
						height: 16,
						name: 'Ксиеця',
						position: { x: 48, y: 50 },
					},
					{
						type: 'прямоугольник',
						width: 7,
						height: 17,
						name: 'Основа',
						position: { x: 51, y: 52 },
					},
				],
				src: [
					'./static/images/panel1.png',
					'./static/images/panel2.png',
					'./static/images/panel3.png',
				],
			},
			{
				id: 2,
				title: 'Модульный блок',
				elements: [
					{
						type: 'прямоугольник',
						width: 25,
						height: 10,
						name: 'Модуль',
						position: { x: 21, y: 20 },
					},
					{
						type: 'прямоугольник',
						width: 11,
						height: 26,
						name: 'Льмоду',
						position: { x: 41, y: 40 },
					},
					{
						type: 'прямоугольник',
						width: 12,
						height: 27,
						name: 'дуМоль',
						position: { x: 60, y: 61 },
					},
				],
				src: ['./static/images/module1.png', './static/images/module2.png'],
			},
			{
				id: 3,
				title: 'Регулируемая рама',
				elements: [
					{
						type: 'прямоугольник',
						width: 35,
						height: 8,
						name: 'Рама',
						position: { x: 33, y: 34 },
					},
					{
						type: 'прямоугольник',
						width: 9,
						height: 36,
						name: 'Арма',
						position: { x: 35, y: 36 },
					},
					{
						type: 'прямоугольник',
						width: 10,
						height: 37,
						name: 'Марр',
						position: { x: 54, y: 53 },
					},
					{
						type: 'прямоугольник',
						width: 11,
						height: 38,
						name: 'Мрра',
						position: { x: 55, y: 56 },
					},
				],
				src: [
					'./static/images/frame1.png',
					'./static/images/frame2.png',
					'./static/images/frame3.png',
				],
			},
		]

		return (
			blueprints.find(blueprint => blueprint.id === Number(this.id)) ||
			blueprints[0]
		)
	}

	get pageRoot() {
		return document.getElementById('blueprint-page')
	}

	getHTML() {
		const elementsList = this.data.elements
			.map(
				el => `
            <li class="details-item">
                <div class="details-item-text">
                    <div class="details-item-name">${el.name}</div>
                    <small class="details-item-type">${el.type} coordinates (${el.width};${el.height})</small>
                </div>
                <span class="details-item-badge">size: ${el.position.x}x${el.position.y}</span>
            </li>`
			)
			.join('')

		return `
    <div id="blueprint-page">
        <div class="main-container">
            <!-- Шапка -->
            <div class="header">
                <div id="back-button-container"></div>
                <div class="header-center">
                    <h4 class="header-title">${this.data.title}</h4>
                </div>
                <div></div>
            </div>
            
            <!-- Карусель -->
            <div class="carousel-container" id="carousel-container"></div>
            
            <!-- Основной контент -->
            <div class="content-wrapper">
                <!-- Детали элементов -->
                <div class="details-card">
                    <div class="card-header">
                        <small>Детали элементов</small>
                    </div>
                    <ul class="details-list">
                        ${elementsList}
                    </ul>
                </div>
                
                <!-- Аналитика -->
                <div class="analytics-card">
                    <div class="card-header">
                        <small>Анализ чертежа</small>
                    </div>
                    <div class="analytics-grid">
                        <div class="analytics-item">
                            <span>Сумма квадратов площадей объектов:</span>
                            <strong>${this.calculateTotalSquaredArea()}</strong>
                        </div>
												
                        <div class="analytics-item">
                            <span>Диапазоны координат объектов:</span>
                            <strong>${this.getDimensionRanges()}</strong>
                        </div>
                        <div class="analytics-item">
                            <span>Среднее значение длины стороны объекта:</span>
                            <strong>${this.calculateAverageElementSize()}</strong>
                        </div>
                        <div class="analytics-item">
                            <span>Анаграммы названий объектов:</span>
                            <strong>${this.findElementAnagrams()}</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`
	}
	calculateAverageElementSize() {
		let totalDimensionsSum = 0
		for (const element of this.blueprintElements) {
			totalDimensionsSum += element.width
			totalDimensionsSum += element.height
		}
		const averageSize = totalDimensionsSum / this.blueprintElements.length / 2
		return averageSize.toFixed(2)
	}

	getDimensionRanges() {
		const uniqueCoordinates = new Set()

		for (let i = 0; i < this.blueprintElements.length; i++) {
			const element = this.blueprintElements[i]
			uniqueCoordinates.add(element.position.x)
			uniqueCoordinates.add(element.position.y)
		}

		const sortedCoordinates = Array.from(uniqueCoordinates)

		sortedCoordinates.sort((a, b) => a - b)

		const coordinateRanges = []

		let rangeStart = sortedCoordinates[0]

		for (let i = 1; i < sortedCoordinates.length; i++) {
			if (sortedCoordinates[i] - sortedCoordinates[i - 1] !== 1) {
				let range
				if (rangeStart === sortedCoordinates[i - 1]) {
					range = `${rangeStart}`
				} else {
					range = `${rangeStart}-${sortedCoordinates[i - 1]}`
				}
				coordinateRanges.push(range)
				rangeStart = sortedCoordinates[i]
			}
		}

		let lastRange
		if (rangeStart === sortedCoordinates[sortedCoordinates.length - 1]) {
			lastRange = `${rangeStart}`
		} else {
			lastRange = `${rangeStart}-${
				sortedCoordinates[sortedCoordinates.length - 1]
			}`
		}
		coordinateRanges.push(lastRange)

		let resultString = ''
		for (let i = 0; i < coordinateRanges.length; i++) {
			if (i > 0) {
				resultString += ', '
			}
			resultString += coordinateRanges[i]
		}

		return resultString
	}

	calculateTotalSquaredArea() {
		let totalSquaredArea = 0
		this.blueprintElements.forEach(element => {
			const elementArea = element.width * element.height
			totalSquaredArea += Math.pow(elementArea, 2)
		})
		return totalSquaredArea.toFixed(2)
	}

	findElementAnagrams() {
		const anagramGroups = new Map()

		const elements = this.blueprintElements.slice()

		do {
			const element = elements.shift()
			const name = element.name

			const lowerCaseName = name.toLowerCase()

			const lettersArray = lowerCaseName.split('')
			lettersArray.sort()
			const sortedLetters = lettersArray.join('')

			if (anagramGroups.has(sortedLetters)) {
				anagramGroups.get(sortedLetters).push(name)
			} else {
				anagramGroups.set(sortedLetters, [name])
			}
		} while (elements.length > 0)

		let result = []
		for (const group of anagramGroups.values()) {
			if (group.length > 1) {
				result.push(group.join(' = '))
			}
		}

		if (result.length > 0) {
			return result.join(', ')
		} else {
			return 'Анаграммы не найдены'
		}
	}
	clickBack() {
		const mainPage = new MainPage(this.parent)
		mainPage.render()
	}

	render() {
		this.parent.innerHTML = ''
		const html = this.getHTML()
		this.parent.insertAdjacentHTML('beforeend', html)

		const backButtonContainer = document.getElementById('back-button-container')
		const backButton = new BackButtonComponent(backButtonContainer)
		backButton.render(this.clickBack.bind(this))

		const carouselContainer = document.getElementById('carousel-container')
		const carousel = new CaruselComponent(carouselContainer)
		carousel.render(this.data)
	}
}
