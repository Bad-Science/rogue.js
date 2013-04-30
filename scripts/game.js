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
		this.customLogic = null;
		this.logic = function()
		{
			for (var comp in self)
			{
				if (comp.logic)
					comp.logic();
				if (self.customLogic)
					self.customLogic();
			}
		};
		this.x = 0;
		this.y = 0;
	},
};

// Rogue.game.Entity.prototype.subclass = function(parent)
// {
// 	this.prototype = new parent();
// 	var self = this;
// 	var parentConst = this.prototype.constructor;
// 	this.prototype.constructor = function()
// 	{
// 		parentConst();
// 		self();
// 	};
// 	this.prototype.parent = parent.prototype;
// 	this.prototype.superConstructor = parentConst;
// }
