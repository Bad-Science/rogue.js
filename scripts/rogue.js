var Rogue =
{

	/*<screen>*/
	initScreen: function(c, w, h, f)
	{
		// this.screen = new Screen(canvas);
		//Screen.canvas 
		// alert(canvas.id);
		Rogue.screen.canvas = c;
		Rogue.screen.width = w;
		Rogue.screen.height = h;
		Rogue.screen.fontSize = f;
		Rogue.screen.createBuffers();
	},

	make2DArray: function(w, h)
	{
		var arr = {};
		for (var x = 0; x < w; x++)
			arr[x] = {};
		return arr;
	},

	screen:
	{
		canvas: {},
		charBuffer: {},
		colorBuffer: {},
		fontSize: 16,
		
		createBuffers: function(wp, hp)
		{
			var w = wp || Rogue.screen.width;
			var h = hp || Rogue.screen.height;
			Rogue.screen.charBuffer = Rogue.make2DArray(w, h);
			Rogue.screen.colorBuffer = Rogue.make2DArray(w, h);
			for (var x = 0; x < w; x++)
			{
				for (var y = 0; y < h; y++)
				{
					Rogue.screen.charBuffer[x][y] = "Q";
					Rogue.screen.colorBuffer[x][y] = "#FF0000";
				}
			}
		},
		
		gfx: function()
		{
			return Rogue.screen.canvas.getContext('2d');
		},
		
		draw: function()
		{
			if (Rogue.screen.canvas)
			{
				gfx = Rogue.screen.gfx();
				for (var x = 0; x < Rogue.screen.width; x++)
					for (var y = 0; y < Rogue.screen.height; y++)
					{
						gfx.strokeStyle = "#FF0000";
						gfx.fillText(Rogue.screen.charBuffer[x][y], x * Rogue.screen.fontSize, y * Rogue.screen.fontSize);
						// gfx.fillRect(0,0,Rogue.screen.width*Math.random(), Rogue.screen.height*Math.random());
					}
			}
			else alert("Canvas not found!");
		},
	},
	/*</screen>*/

}