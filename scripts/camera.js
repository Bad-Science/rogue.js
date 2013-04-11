Rogue.Camera = function(s, g)
{
	var self = this;
	var screen = s;
	var game = g;

	this.screenToWorld = function(xs, ys)
	{
		return {x: xw, y: yw};
	};
	this.worldToScreen = function(xw, yw)
	{
		return {x: xs, y: ys};
	};

	this.bounds = function()
	{
		return
		{
			x1: self.x() - (scree.width() / 2),
		}
	};

	this.drawEntites = function()
	{
		for (var ientity in Rogue.game.entities)
		{
			var entity = Rogue.game.entities[ientity];
			var sp = self.worldToScreen(entity.x, entity.y);
			var vis = entity.vis();
			screen.charBuffer[sp.x][sp.y] = vis.ch;
			screen.colorBuffer[sp.x][sp.y] = vis.co;
		}
	};

	this.drawMap = function()
	{
		var map = game.getMapRect();
		for (var x = 0; x < map.width; x++)
		{
			for (var y = 0; y < map.height; y++)
			{
				screen.charBuffer
			}
		}
	};
};

Rogue.Camera.subclass(Rogue.game.Entity);