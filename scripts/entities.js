Rogue.game.EntityComponents =
{
	Vis: function(ch, co)
	{
		this.ch = ch;
		this.co = co;
	}

	
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