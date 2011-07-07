var assert = require("assert")
var game = require("game")


assert.isUndefined(game.player1)
assert.isUndefined(game.player2)
console.log(game)
game.registerPlayers("player1", "player2")

exports['should be able to register players'] = function() {
	assert.equal("player1", game.player1.name)
	assert.equal("player2", game.player2.name)
	console.log(game.score())
};

exports['should be able to register a point'] = function() {
	game.reset()
	game.point("player1")
	assert.equal(15, game.player1.score )
	assert.equal(0, game.player2.score )
	assert.equal(false, game.finished())
	console.log(game.score())
}

exports['should be able to register two points'] = function() {
	game.reset()
	game.point("player1");game.point("player1")
	assert.equal(30, game.player1.score )
	assert.equal(0, game.player2.score )	
	assert.equal(false, game.finished())
	console.log(game.score())
}

exports['should be able to register two points for two players'] = function() {
	game.reset()
	game.point("player1");game.point("player1")
	game.point("player2");game.point("player2")
	assert.equal(false, game.deuce())
	assert.equal(30, game.player1.score )
	assert.equal(30, game.player2.score )
	assert.equal(false, game.finished())
	console.log(game.score())
}

exports['when two players gets 40 points, its deuce'] = function() {
	game.reset()
	game.point("player1");game.point("player1");game.point("player1")
	game.point("player2");game.point("player2");game.point("player2")
	assert.equal(40, game.player1.score )
	assert.equal(40, game.player2.score )
	assert.equal(true, game.deuce())
	assert.equal(false, game.finished())
	console.log(game.score())
}

exports['should tackle advantage'] = function() {
	game.reset();
	game.point("player1");game.point("player1");game.point("player1")
	game.point("player2");game.point("player2");game.point("player2");game.point("player2")
	assert.equal(false, game.deuce())
	assert.equal(game.player2, game.advantage)
	assert.equal(false, game.finished())
	console.log(game.score())
}

exports['should handle loosing advantage and getting it again'] = function() {
	game.reset();
	game.point("player1");game.point("player1");game.point("player1")
	game.point("player2");game.point("player2");game.point("player2");game.point("player2")
	assert.equal(game.player2, game.advantage)
	assert.equal(false, game.finished())
	game.point("player1")
	assert.equal(true, game.deuce())
	assert.equal(false, game.finished())
	game.point("player2")
	assert.equal(game.player2, game.advantage)
	assert.equal(false, game.finished())
	console.log(game.score())
}

exports['should be able to declare straightforward winner'] = function () {
	game.reset()
	game.point("player2");game.point("player2");game.point("player2");game.point("player2")
	assert.equal(game.player2, game.winner)
	console.log(game.score())
}

exports['should be able to declare deuced winner'] = function () {
	game.reset();
	game.point("player2");game.point("player2");game.point("player2")
	game.point("player1");game.point("player1");game.point("player1")
	game.point("player1")
	assert.equal(false, game.finished())
	game.point("player1")
	assert.equal(true, game.finished())
	assert.equal(game.player1, game.winner)
	console.log(game.score())
}