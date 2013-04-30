Rogue.Camera = function(g, s, x, y, w, h)
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

	this.bounds = 
	{
		x1: self.x - Math.floor(w / 2),
		y1: self.y - Math.floor(h / 2),
		x2: self.x - Math.round(w / 2),
		y2: self.y - Math.round(h / 2),
		contains: function(sx, sy)
		{
			return (this.sx >= x1 && this.sx <= x2 && this.sy >= y1 && this.sy <= y2);
		},
	};

	this.drawEntites = function()
	{
		for (var ientity in Rogue.game.entities)
		{
			var entity = Rogue.game.entities[ientity];
			if (entity.vis && entity.vis.show && self.bounds.contains(entity.x, entity.y))
			{
				var sp = self.worldToScreen(entity.x, entity.y);
				var vis = entity.vis;
				screen.charBuffer[sp.x][sp.y] = vis.ch;
				screen.colorBuffer[sp.x][sp.y] = vis.co;
			}
		}
	};

	this.drawMap = function()
	{
		var map = game.getMapRect();
		for (var x = 0; x < map.width; x++)
		{
			for (var y = 0; y < map.height; y++)
			{
				var sx = 
				screen.charBuffer[]
			}
		}
	};
};

Rogue.Camera.subclass(Rogue.game.Entity);