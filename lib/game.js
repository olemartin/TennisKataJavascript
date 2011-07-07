var Player = {
	score:0,
	reset:function() {
		this.score = 0
	}
}

var game = {
	registerPlayers:function(player1, player2) {
		this.player1 = Object.create(Player, {name:{value:player1}})
		this.player2 = Object.create(Player, {name:{value:player2}})
	}, 
	point:function(player) {
		var scoreTransitions = {0:15,15:30,30:40,40:50,50:50}
		if (player == this.player1.name) {
			p1 = this.player1
			p2 = this.player2
		} else {
			p1 = this.player2
			p2 = this.player1
		}
		
		p1.score = scoreTransitions[this[player].score];
		
		if (p1.score > 40 && p2.score >= 40) {
			if (this.deuce())
				this.advantage = p1
			else if (this.advantage == p1)
				this.winner = p1
			else
				this.advantage = null
		} else if (p1.score == 50) {
			this.winner = p1
		}
	},
	reset:function() {
		this.player1.reset()
		this.player2.reset()
		this.advantage = null
		this.winner = null
	},
	deuce:function() {
		return this.player1.score >=40 && this.player2.score >= 40 && this.advantage == null
	},
	finished:function() {
		return this.winner != null
	},
	score:function() {
		if (this.winner != null)
			return this.winner.name + " won!"
		else if(this.advantage != null)
			return this.advantage.name + " has advantage"
		else if (this.deuce())
			return "The game is deuce"
		else
			return this.player1.name + " has " + this.player1.score + " and "+ this.player2.name +" has " + this.player2.score
	}
}

exports.registerPlayers = game.registerPlayers
exports.reset = game.reset
exports.point = game.point
exports.deuce = game.deuce
exports.finished = game.finished
exports.score = game.score