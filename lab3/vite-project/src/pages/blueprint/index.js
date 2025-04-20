import ButtonComponent from '../../components/button/index.js'
import { CaruselComponent } from '../../components/carusel/index.js'
import { MainPage } from '../main/index.js'
import { blueprintUrls } from '../../modules/bluePrintUrls.js'
import { elements } from '../../elementsMap.js'
import { BlueprintEditPage } from '../editor/index.js'

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
		this.blueprints = null
		this.blueprintElements = []
		this.getBluePrints()
	}

	async getBluePrints() {
		try {
			const res = await fetch(blueprintUrls.getBluePrintById(this.id))
			const data = await res.json()
			const blueprint = data.find(bp => bp.id === parseInt(this.id))
			this.blueprints = blueprint
			this.blueprintElements = blueprint.elements
				.map(id => elements[id])
				.filter(el => el != null)

			this.renderPageContent()
		} catch (err) {
			console.error('Ошибка при загрузке чертежа:', err)
		}
	}

	initBlueprintElements() {
		if (!this.blueprints || !this.blueprints.elements) return []
		return this.blueprintElements.map(
			el =>
				new BlueprintEntity(el.type, el.width, el.height, el.name, el.position)
		)
	}

	get pageRoot() {
		return document.getElementById('blueprint-page')
	}

	getHTML() {
		const elementsList = this.blueprintElements
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
        <header class="main-header">
            <div class="header-content">
                <div class="logo-container">
                    <img src="/images/logo.png" class="logo-image" alt="Логотип">
                </div>
                <div class="nav-buttons-container">
                    <div id="add-button-container" class="nav-button-wrapper"></div>
                    <div id="edit-button-container" class="nav-button-wrapper"></div>
                </div>
            </div>
        </header>
        
        <div class="main-container">
            <div class="content-wrapper">
                <h2 class="blueprint-title">${this.blueprints.title}</h2>
                <div class="carousel-container" id="carousel-container"></div>
                
                <div class="details-card">
                    <div class="card-header">
                        <small>Детали элементов</small>
                    </div>
                    <ul class="details-list">
                        ${elementsList}
                    </ul>
                </div>
                
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

		const sortedCoordinates = Array.from(uniqueCoordinates).sort(
			(a, b) => a - b
		)

		const coordinateRanges = []
		let rangeStart = sortedCoordinates[0]

		for (let i = 1; i < sortedCoordinates.length; i++) {
			if (sortedCoordinates[i] - sortedCoordinates[i - 1] !== 1) {
				const range =
					rangeStart === sortedCoordinates[i - 1]
						? `${rangeStart}`
						: `${rangeStart}-${sortedCoordinates[i - 1]}`
				coordinateRanges.push(range)
				rangeStart = sortedCoordinates[i]
			}
		}

		const lastRange =
			rangeStart === sortedCoordinates[sortedCoordinates.length - 1]
				? `${rangeStart}`
				: `${rangeStart}-${sortedCoordinates[sortedCoordinates.length - 1]}`
		coordinateRanges.push(lastRange)

		return coordinateRanges.join(', ')
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

		while (elements.length > 0) {
			const element = elements.shift()
			const name = element.name.toLowerCase().split('').sort().join('')

			if (anagramGroups.has(name)) {
				anagramGroups.get(name).push(element.name)
			} else {
				anagramGroups.set(name, [element.name])
			}
		}

		let result = []
		for (const group of anagramGroups.values()) {
			if (group.length > 1) {
				group.sort()
				result.push(group)
			}
		}

		result.sort((a, b) => a[0] < b[0])
		result = result.map(group => group.join(' = '))

		return result.length > 0 ? result.join(', ') : 'Анаграммы не найдены'
	}

	handleEditBluePrint() {
		const blueprintEditPage = new BlueprintEditPage(
			this.parent,
			'edit',
			this.blueprints
		)
		blueprintEditPage.render()
	}
	clickBack() {
		const mainPage = new MainPage(this.parent)
		mainPage.render()
	}

	renderPageContent() {
		this.parent.innerHTML = ''
		this.parent.insertAdjacentHTML('beforeend', this.getHTML())

		const logo = document.querySelector('.logo-image')
		if (logo) {
			logo.addEventListener('click', () => {
				this.parent.innerHTML = ''
				new MainPage(this.parent).render()
			})
		}

		const editButtonContainer = document.getElementById('edit-button-container')
		const editButton = new ButtonComponent(editButtonContainer, 'Изменить')
		editButton.render(() => this.handleEditBluePrint())

		const carouselContainer = document.getElementById('carousel-container')
		const carousel = new CaruselComponent(carouselContainer)
		carousel.render(this.blueprints)
	}

	render() {
		this.getBluePrints()
	}
}
