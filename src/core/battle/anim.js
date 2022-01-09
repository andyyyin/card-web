import anime from "../../anime";


export default (state, refs) => {
	const anim = {}
	anim.glint = async () => {
		refs.animMask.style.display = 'block'
		await anime.glint(refs.animMask)
		refs.animMask.style.display = 'none'
	}
	return { anim }
}