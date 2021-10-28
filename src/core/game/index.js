import Cards from '../cards'

const cards = [
	new Cards.Strike(),
	new Cards.Strike(),
	new Cards.Strike(),
	new Cards.Strike(),
	new Cards.StrengthUp(),
	new Cards.PutWeak(),
	new Cards.Defense(),
	new Cards.Defense(),
	new Cards.Defense(),
	new Cards.Defense(),
]

const getCards = () => cards

export default {
	getCards,
}