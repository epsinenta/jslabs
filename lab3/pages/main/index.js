import { BlueprintCardComponent } from '../../components/blueprint-card/index.js'
import { BlueprintPage } from '../blueprint/index.js'

export class MainPage {
	constructor(parent) {
		this.parent = parent
		this.data = this.getData()
	}

	getData() {
		return [
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
	}

	get pageRoot() {
		return document.getElementById('main-page')
	}

	getHTML() {
		return `<div id="main-page" class="d-flex flex-wrap gap-3 p-3" style="background-color: #101214;"></div>`
	}

	renderCard() {
		this.pageRoot.innerHTML = ''
		this.data.forEach(item => {
			const blueprintCard = new BlueprintCardComponent(this.pageRoot)
			blueprintCard.render(
				item,
				() => this.clickCard(item.id),
				() => this.handleRemoveCard(item.id)
			)
		})
	}

	clickCard(cardId) {
		const blueprintPage = new BlueprintPage(this.parent, cardId)
		blueprintPage.render()
	}

	handleRemoveCard(cardId) {
		this.data = this.data.filter(item => item.id !== cardId)
		this.renderCard()
	}

	render() {
		this.parent.innerHTML = ''
		this.parent.insertAdjacentHTML('beforeend', this.getHTML())
		this.renderCard()
	}
}
