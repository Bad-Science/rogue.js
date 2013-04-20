

Rogue.game.Entities = 
{
	NPC: function()
	{
		this.logic = function()
		{
			move();
		};
		// this.vis = "@";
	},
};

Rogue.game.Entities.NPC.subclass();

// subclassAll(Rogue.game.Entity, Rogue.game.Entities);