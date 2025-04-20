import { ajax } from '../../modules/ajax.js'
import { blueprintUrls } from '../../modules/bluePrintUrls.js'
import { MainPage } from '../main/index.js'
import { BlueprintPage } from '../blueprint/index.js' // Добавь это, чтобы работал переход на страницу

export class BlueprintEditPage {
	constructor(parent, mode, blueprint = null) {
		this.parent = parent
		this.mode = mode
		this.blueprint = blueprint || {
			title: '',
			elements: [],
			src: [],
		}
	}

	getHTML() {
		const { title, elements, src } = this.blueprint
		const buttonText = this.mode === 'edit' ? 'Сохранить' : 'Добавить'

		return `
    <div class="edit-page d-flex flex-column align-items-center justify-content-center min-vh-100">
      <header class="main-header w-100">
        <div class="header-content d-flex justify-content-center p-3">
          <div class="logo-container">
            <img src="./static/images/logo.png" class="logo-image" alt="Логотип">
          </div>
        </div>
      </header>

      <div class="edit-form d-flex flex-column align-items-center gap-3 p-4 custom-form-container">
        <input 
          type="text" 
          id="title-input" 
          class="form-control" 
          placeholder="Введите название чертежа" 
          value="${title}"
        >
        <input 
          type="text" 
          id="elements-input" 
          class="form-control" 
          placeholder="ID элементов (через запятую)" 
          value="${elements.join(',')}"
        >
				
        <input 
          type="text" 
          id="src-input" 
          class="form-control" 
          placeholder="Пути к изображениям (через запятую)" 
          value="${src.join(',')}"
        >

        <button id="save-button" class="btn custom-btn mt-3">${buttonText}</button>
      </div>
    </div>
  `
	}

	saveBlueprint() {
		const title = document.getElementById('title-input').value.trim()
		const elements = document
			.getElementById('elements-input')
			.value.split(',')
			.map(e => e.trim())
		const src = document
			.getElementById('src-input')
			.value.split(',')
			.map(e => e.trim())

		const data = { title, elements, src }

		if (this.mode === 'create') {
			ajax.get(blueprintUrls.getBluePrints(), blueprints => {
				const ids = blueprints.map(bp => bp.id)
				const newId = ids.length > 0 ? Math.max(...ids) + 1 : 1
				const blueprintWithId = { id: newId, ...data }

				ajax.post(blueprintUrls.createBluePrint(), blueprintWithId, () => {
					new MainPage(this.parent).render()
				})
			})
		} else {
			ajax.put(blueprintUrls.getBluePrintById(this.blueprint.id), data, () => {
				new MainPage(this.parent).render()
			})
		}
	}

	render() {
		this.parent.innerHTML = ''
		this.parent.insertAdjacentHTML('beforeend', this.getHTML())

		document
			.getElementById('save-button')
			.addEventListener('click', () => this.saveBlueprint())

		const logo = document.querySelector('.logo-image')
		if (logo) {
			logo.addEventListener('click', () => {
				new MainPage(this.parent).render()
			})
		}
	}
}
