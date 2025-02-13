import { UserCardComponent } from '../../components/user-card/index.js'
import { UserPage } from '../user/index.js'

export class MainPage {
	constructor(parent) {
		this.parent = parent
		this.currentIndex = 0
		this.data = this.getData()
	}

	getData() {
		return [
			{
				id: 1,
				src: [
					'https://avatars.dzeninfra.ru/get-zen_doc/5233119/pub_64b5b42d6d021470e6a7521e_64b5b4336d021470e6a7552e/scale_1200',
					'https://www.kino-teatr.ru/news/25799/227236.jpg',
					'https://static.independent.co.uk/s3fs-public/thumbnails/image/2016/05/16/14/gettyimages-488815035.jpg?quality=75&width=1200&auto=webp',
				],
			},
			{
				id: 2,
				src: [
					'https://cdn.justjared.com/wp-content/uploads/headlines/2023/08/sydney-sweeney-variety-1.jpg',
					'https://i0.wp.com/media.glamour.com/photos/630b89cb77c555d71797fb17/1:1/w_2656,h_2656,c_limit/1414724029?ssl=1',
				],
			},
			{
				id: 3,
				src: [
					'https://avatars.dzeninfra.ru/get-zen_doc/99845/pub_620b9cded0153749863be261_620ba6ecfe15ff1d9bc025a7/scale_1200',
					'https://telegra.ph/file/d242eac90a23f0d44788b.png',
					'https://cdnn21.img.ria.ru/images/150146/31/1501463172_135:0:2112:1977_1920x0_80_0_0_51095fb0f0e68a7aadaf1d5ab33c1938.jpg',
					'https://static10.tgstat.ru/channels/_0/57/5735c2d5d54892789d43ff6f9c9f6224.jpg',
				],
			},
		]
	}

	get pageRoot() {
		return document.getElementById('main-page')
	}

	getHTML() {
		return `
            <div id="main-page" class="d-flex flex-wrap"><div/>
        `
	}
	renderCard() {
		this.pageRoot.innerHTML = ''

		if (this.currentIndex >= this.data.length) {
			this.currentIndex = 0
		}

		const item = this.data[this.currentIndex]
		const userCard = new UserCardComponent(this.pageRoot)
		userCard.render(
			item,
			this.clickCard.bind(this),
			this.handleRemoveCard.bind(this)
		)
	}

	handleRemoveCard() {
		this.currentIndex++
		this.renderCard()
	}

	clickCard(e) {
		const card = e.target.closest('[data-id]')
		if (!card) return

		const cardId = card.dataset.id
		console.log('Clicked card ID:', cardId)

		const userPage = new UserPage(this.parent, cardId)
		userPage.render()
	}

	render() {
		this.parent.innerHTML = ''
		this.parent.insertAdjacentHTML('beforeend', this.getHTML())

		this.renderCard()
	}
}
