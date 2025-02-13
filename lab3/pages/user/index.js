import { CaruselComponent } from '../../components/carusel/index.js'
import { BackButtonComponent } from '../../components/back-button/index.js'
import { MainPage } from '../main/index.js'

export class UserPage {
	constructor(parent, id) {
		this.parent = parent
		this.id = id
		this.data = this.getData()
	}

	getData() {
		const users = [
			{
				id: 1,
				src: [
					'https://avatars.dzeninfra.ru/get-zen_doc/5233119/pub_64b5b42d6d021470e6a7521e_64b5b4336d021470e6a7552e/scale_1200',
					'https://www.kino-teatr.ru/news/25799/227236.jpg',
					'https://static.independent.co.uk/s3fs-public/thumbnails/image/2016/05/16/14/gettyimages-488815035.jpg?quality=75&width=1200&auto=webp',
				],
				name: 'Angela Joli',
			},
			{
				id: 2,
				src: [
					'https://cdn.justjared.com/wp-content/uploads/headlines/2023/08/sydney-sweeney-variety-1.jpg',
					'https://i0.wp.com/media.glamour.com/photos/630b89cb77c555d71797fb17/1:1/w_2656,h_2656,c_limit/1414724029?ssl=1',
				],
				name: 'Sidni Suini',
			},
			{
				id: 3,
				src: [
					'https://avatars.dzeninfra.ru/get-zen_doc/99845/pub_620b9cded0153749863be261_620ba6ecfe15ff1d9bc025a7/scale_1200',
					'https://telegra.ph/file/d242eac90a23f0d44788b.png',
					'https://cdnn21.img.ria.ru/images/150146/31/1501463172_135:0:2112:1977_1920x0_80_0_0_51095fb0f0e68a7aadaf1d5ab33c1938.jpg',
				],
				name: 'Vitalik Buterin',
			},
		]

		return users.find(user => user.id === Number(this.id)) || users[0]
	}

	get pageRoot() {
		return document.getElementById('user-page')
	}

	getHTML() {
		return `
            <div id="user-page" class="container d-flex flex-column align-items-center mt-5">
				<h2>Вы лайкнули пользователя #${this.id}</h2>
        		<h2>${this.data.name}</h2>
            </div>
        `
	}

	clickBack() {
		const mainPage = new MainPage(this.parent)
		mainPage.render()
	}

	render() {
		this.parent.innerHTML = ''
		const html = this.getHTML()
		this.parent.insertAdjacentHTML('beforeend', html)

		const backButton = new BackButtonComponent(this.pageRoot)
		backButton.render(this.clickBack.bind(this))

		const carousel = new CaruselComponent(this.pageRoot)
		carousel.render(this.data)
	}
}
