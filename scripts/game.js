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
		var _x, _y;
		var _vis = {ch: "", co: ""};

		this.comps = {};
		this.customLogic = null;
		this.logic = function()
		{
			for (var comp in self.comps)
			{
				if (comp.logic)
					comp.logic();
				if (self.customLogic)
					self.customLogic();
			}
		};

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
	},
};

Rogue.game.Entity.prototype.subclass = function(parent)
{
	parent = (parent || Rogue.game.Entity)
	this.prototype = new parent();
	var self = this;
	var parentConst = this.prototype.constructor;
	this.prototype.constructor = function()
	{
		parentConst();
		self();
	};
	this.prototype.parent = parent.prototype;
}

Rogue.game.EntityComponents =
{
	Vis: function(ch, co)
	{
		this.ch = ch;
		this.co = co;
	}

	
};