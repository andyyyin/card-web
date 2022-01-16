import anime from "../../anime";


export default (fn, state, refs) => {
	fn.anim = {}
	fn.anim.glint = async () => {
		refs.animMask.style.display = 'block'
		await anime.glint(refs.animMask)
		refs.animMask.style.display = 'none'
	}
	return fn
}