class Token {
	constructor(type, value = null, pos = null, line) {
		if (!type) throw new Error("Type is needed")
        if (!line) throw new Error("Line is needed")

		this.type = type
		this.value = value
		this.pos = pos
        this.line = line
	}
}

module.exports = Token;