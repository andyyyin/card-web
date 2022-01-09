import anime from "../../anime";


export default (state, refs) => {
	const anim = {}
	anim.glint = () => {
		return anime.glint(refs.animMask)
	}
	return { anim }
}