import Strike from "../cards/strike";
import StrengthUp from "../cards/strengthUp";
import Defense from "../cards/defense";

const cards = [
	new Strike(),
	new Strike(),
	new Strike(),
	new Strike(),
	new StrengthUp(),
	new Defense(),
	new Defense(),
	new Defense(),
	new Defense()
]

const getCards = () => cards

export default {
	getCards,
}