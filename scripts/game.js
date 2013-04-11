Rogue.game = 
{
	map: undefined,
	
	loadMap: function(path)
	{
		
	},

	entities: [],

	logic: function(screen)
	{
		for (var entity in entities)
		{
			entity.logic();
		}
		if (screen)
		{
			for (var entity in entities)
			{
				if (entity.vis)
				{
					screen.charBuffer[entity.x][entity.y] = entity.vis;
				}
			}
		}
	},

	Entity: function()
	{
		var self = this;
		this.logic = function(){};
		var _x, _y;
		var _vis = {ch: "", co: ""};
		this.x = function(n)
		{
			if (n != undefined)
			{
				_x = n;
			}
			return _x;
		};
		this.y = function(n)
		{
			if (n != undefined)
			{
				_y = n;
			}
			return _y;
		};
		this.vis = function(nvis)
		{
			if (nvis)
			{
				_vis.ch = nvis.ch;
				_vis.co = nvis.co;
			}
			return {ch: _vis.ch, co: _vis.co};
		};
	},
};