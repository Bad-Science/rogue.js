Rogue.game.EntityComponents =
{

};

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

subclassAll(Rogue.game.Entity, Rogue.game.Entities);