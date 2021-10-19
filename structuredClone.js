function structuredClone(source, functions = false, index = [], callback = (index, value) => undefined) => {
	let value = null;
	value = callback(index, source);
	if(value === undefined)
		if(Array.isArray(source)) {
			value = [...source];
			for(let i = 0; i < value.length; i++)
				value[i] = ASTROGRAPH.structuredClone(value[i], functions, [...index, i], callback);
		}
		else if(source === null)
			value = null;
		else if(typeof source == 'object' && source.__proto__ == Object.prototype) {
			value = Object.assign({}, source);
			for(let name in value)
				value[name] = ASTROGRAPH.structuredClone(value[name], functions, [...index, name], callback);
		}
		else if(typeof source == 'function')
			value = functions ? source.toString() : source;
		else
			value = source;
	return value;
}
