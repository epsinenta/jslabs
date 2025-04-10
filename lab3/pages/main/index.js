import { BlueprintCardComponent } from '../../components/blueprint-card/index.js'
import { BlueprintPage } from '../blueprint/index.js'
import ButtonComponent from '../../components/button/index.js'

export class MainPage {
	constructor(parent) {
		this.parent = parent
		this.blueprints = this.getBluePrints()
		this.searchQuery = ''
	}

	getBluePrints() {
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
		return `
            <div>
						<header class="main-header">
                <div class="header-content">
                    <div class="logo-container">
                        <img src="./static/images/logo.png" class="logo-image" alt="Логотип">
                    </div>
                    <div class="nav-buttons-container">
                        <div id="add-button-container" class="nav-button-wrapper"></div>
                        <div id="edit-button-container" class="nav-button-wrapper"></div>
                    </div>
                </div>
            </header>
                <div id="controls-container" class="p-3 d-flex gap-2 align-items-center">
                    <input 
                    type="text" 
                    id="search-input" 
                    class="form-control" 
                    placeholder="Введите название чертежа"
                >
                    
                </div>
                <div id="main-page" class="d-flex flex-wrap gap-3 p-3" style="background-color: #101214;"></div>
            </div>
        `
	}
	handleAddBluePrint() {
		if (this.blueprints.length === 0) return

		const firstBluePrint = JSON.parse(JSON.stringify(this.blueprints[0]))

		const newBluePrint = {
			...firstBluePrint,
			id: this.generateNewId(),
			title: `${firstBluePrint.title} (копия)`,
		}

		this.blueprints.push(newBluePrint)
		this.renderBluePrint()
	}
	handleEditBluePrint() {}
	generateNewId() {
		const ids = this.blueprints.map(item => item.id)
		return ids.length > 0 ? Math.max(...ids) + 1 : 1
	}

	handleSearchInput(event) {
		this.searchQuery = event.target.value.toLowerCase().trim()
		this.renderBluePrint()
	}
	getFilteredBluePrints() {
		if (!this.searchQuery) return this.blueprints

		return this.blueprints.filter(blueprint => {
			const inTitle = blueprint.title.toLowerCase().includes(this.searchQuery)
			return inTitle
		})
	}
	renderBluePrint() {
		this.pageRoot.innerHTML = ''
		const filteredBluePrints = this.getFilteredBluePrints()

		filteredBluePrints.forEach(item => {
			const blueprintBluePrint = new BlueprintCardComponent(this.pageRoot)
			blueprintBluePrint.render(
				item,
				() => this.clickBluePrint(item.id),
				() => this.handleRemoveBluePrint(item.id)
			)
		})
	}

	clickBluePrint(blueprintId) {
		const blueprintPage = new BlueprintPage(this.parent, blueprintId)
		blueprintPage.render()
	}

	handleRemoveBluePrint(blueprintId) {
		this.blueprints = this.blueprints.filter(item => item.id !== blueprintId)
		this.renderBluePrint()
	}
	render() {
		this.parent.innerHTML = ''
		this.parent.insertAdjacentHTML('beforeend', this.getHTML())

		const logo = document.querySelector('.logo-image')
		if (logo) {
			logo.addEventListener('click', () => {
				this.parent.innerHTML = ''
				new MainPage(this.parent).render()
			})
		}

		const addButtonContainer = document.getElementById('add-button-container')
		const addButton = new ButtonComponent(addButtonContainer, 'Добавить')
		addButton.render(() => this.handleAddBluePrint())

		const editButtonContainer = document.getElementById('edit-button-container')
		const editButton = new ButtonComponent(editButtonContainer, 'Изменить')
		editButton.render(() => this.handleEditBluePrint())

		const searchInput = document.getElementById('search-input')
		searchInput.addEventListener('input', e => this.handleSearchInput(e))
		this.renderBluePrint()
	}
}
