import BaseState from "./base";
import Shiv from "../cards/shiv";

export default class Accuracy extends BaseState{

	name = '精准'

	icon = 'accuracy'

	level = 1

	/* 相关逻辑在shiv卡牌数据里判断 */

	constructor(level) {
		super(level);
		this.level = level || 1
	}

}