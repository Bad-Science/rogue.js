Rogue.game.EntityComponents =
{
	Vis: function(p, ch, co)
	{
		this.ch = ch;
		this.co = co;
	},
	
	V: function(p, x, y)
	{
		var self = this;
		this.x = (x || 0);
		this.y = (y || 0);
		this.logic = function()
		{
			p.x += self.x;
			p.y += self.y;
		};
		//TODO: have each component add itself to keep property names constant
	},
};

Rogue.game.Entities = 
{
	NPC: function()
	{
		this.vis = new Rogue.game.EntityComponents.Vis(this, '♀', "#BC8F8F");
		this.v = new Rogue.game.EntityComponents.V(this, 0, 0);
	},
};

Rogue.game.Entities.NPC.subclass(Rogue.game.Entity);

// subclassAll(Rogue.game.Entity, Rogue.game.Entities);