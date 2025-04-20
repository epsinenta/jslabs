import { blueprintUrls } from '../../modules/bluePrintUrls.js'
import { MainPage } from '../main/index.js'

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
		<style>
  .form-control::placeholder {
    color: #888888;
    opacity: 1;
  }

  #save-button {
    background-color: #00ace2;
    color: #ffffff;
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    transition: background-color 0.3s ease;
    cursor: pointer;
  }

  #save-button:hover {
    background-color: #4ac0f2;
    color: #ffffff;
  }
</style>
    <div class="edit-page d-flex flex-column align-items-center justify-content-center min-vh-100">
					
      <header class="main-header w-100">
        <div class="header-content d-flex justify-content-center p-3">
          <div class="logo-container">
            <img src="/images/logo.png" class="logo-image" alt="Логотип">
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
					style="
    background-color: #2a2e32;
    color: #fff;
    border: 1px solid #3d4348;
    border-radius: 8px;
    padding: 10px 14px;
    font-size: 16px;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
    width: 100%;
    box-sizing: border-box;
  "
  onfocus="this.style.borderColor='#4ac0f2';"
  onblur="this.style.borderColor='#3d4348';"
        >
        <input 
          type="text" 
          id="elements-input" 
          class="form-control" 
          placeholder="ID элементов (через запятую)" 
          value="${elements.join(',')}"
					style="
    background-color: #2a2e32;
    color: #fff;
    border: 1px solid #3d4348;
    border-radius: 8px;
    padding: 10px 14px;
    font-size: 16px;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
    width: 100%;
    box-sizing: border-box;
  "
  onfocus="this.style.borderColor='#4ac0f2';"
  onblur="this.style.borderColor='#3d4348';"
        >
				
        <input 
          type="text" 
          id="src-input" 
          class="form-control" 
          placeholder="Пути к изображениям (через запятую)" 
          value="${src.join(',')}"
					style="
    background-color: #2a2e32;
    color: #fff;
    border: 1px solid #3d4348;
    border-radius: 8px;
    padding: 10px 14px;
    font-size: 16px;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
    width: 100%;
    box-sizing: border-box;
  "
  onfocus="this.style.borderColor='#4ac0f2';"
  onblur="this.style.borderColor='#3d4348';"
        >

        <button id="save-button" class="btn mt-3">
  ${buttonText}
</button>
      </div>
    </div>
  `
	}

	async saveBlueprint() {
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
			try {
				const res = await fetch(blueprintUrls.getBluePrints())
				const blueprints = await res.json()
				const ids = blueprints.map(bp => bp.id)
				const newId = ids.length > 0 ? Math.max(...ids) + 1 : 1
				const blueprintWithId = { id: newId, ...data }

				await fetch(blueprintUrls.createBluePrint(), {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(blueprintWithId),
				})
				new MainPage(this.parent).render()
			} catch (err) {
				console.error('Ошибка при создании:', err)
			}
		} else {
			try {
				await fetch(blueprintUrls.getBluePrintById(this.blueprint.id), {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(data),
				})
				new MainPage(this.parent).render()
			} catch (err) {
				console.error('Ошибка при сохранении:', err)
			}
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
