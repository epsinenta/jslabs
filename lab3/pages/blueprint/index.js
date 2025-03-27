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
		this.blueprints = this.getBluePrints()
		this.blueprintElements = this.initBlueprintElements()
	}

	initBlueprintElements() {
		return this.blueprints.elements.map(
			el =>
				new BlueprintEntity(el.type, el.width, el.height, el.name, el.position)
		)
	}

	getBluePrints() {
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
		const elementsList = this.blueprints.elements
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
            <div class="header">
                <div id="back-button-container"></div>
                <div class="header-center">
                    <h4 class="header-title">${this.blueprints.title}</h4>
                </div>
                <div></div>
            </div>
            
            <div class="carousel-container" id="carousel-container"></div>
            
            <div class="content-wrapper">
                <div class="details-card">
                    <div class="card-header">
                        <small>Детали элементов</small>
                    </div>
                    <ul class="details-list">
                        ${elementsList}
                    </ul>
                </div>
            </div>
        </div>
    </div>`
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
		carousel.render(this.blueprints)
	}
}
