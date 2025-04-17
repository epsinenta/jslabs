import { BlueprintCardComponent } from '../../components/blueprint-card/index.js'
import { BlueprintPage } from '../blueprint/index.js'
import ButtonComponent from '../../components/button/index.js'
import { ajax } from '../../modules/ajax.js'
import { blueprintUrls } from '../../modules/bluePrintUrls.js'
export class MainPage {
	constructor(parent) {
		this.parent = parent
		this.blueprints = this.getBluePrints()
		this.searchQuery = ''
	}

	getBluePrints() {
		ajax.get(blueprintUrls.getBluePrints(), data => {
			this.renderData(data)
		})
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

		const query = this.searchQuery
			? `?title=${encodeURIComponent(this.searchQuery)}`
			: ''

		ajax.get(`${blueprintUrls.getBluePrints()}${query}`, data => {
			this.renderData(data)
		})
	}

	renderData(items) {
		this.pageRoot.innerHTML = ''
		items.forEach(item => {
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
		ajax.delete(blueprintUrls.getBluePrintById(blueprintId), () => {
			this.getBluePrints()
		})
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
		//this.renderBluePrint()
	}
}
