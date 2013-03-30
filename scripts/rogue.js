var Rogue =
{

	screens: {},

	/*<screen>*/

	make2DArray: function(w, h)
	{
		var arr = [];
		while (arr.push([h]) < w);
		return arr;
	},

	Screen: function(c, w, h, f, i)
	{
		var self = this;
		var width = w;
		var height = h;
		var canvas = c;
		var fontSize = f;
		var id = i;
		// this.font = "regular PC_CGA 20px"
		this.charBuffer = Rogue.make2DArray(width, height);
		this.colorBuffer = Rogue.make2DArray(width, height);
		
		this.initBuffers = function()
		{
			for (var x = 0; x < width; x++)
			{
				for (var y = 0; y < height; y++)
				{
					self.charBuffer[x][y] = "Q";
					self.colorBuffer[x][y] = "#000000";
				}
			}
		};
		
		function getGfx()
		{
			return canvas.getContext('2d');
		};
		
		this.draw = function()
		{
			if (canvas)
			{
				var gfx = getGfx();
				for (var x = 0; x < width; x++)
					for (var y = 0; y < height; y++)
					{
						gfx.fillStyle = self.colorBuffer[x][y];
						gfx.fillText(self.charBuffer[x][y], x/1.5 * fontSize, (y + .8) / 1.1 * fontSize);
					}
			}
			else alert("Canvas not found!");
		};

		this.id = function()
		{
			return id;
		};

		if (Rogue)
			Rogue.screens[id] = this;
	},

	ScreenUtils:
	{

		DOUBLE_LINE_BOX: ['═', '║', '╔', '╗', '╝', '╚'],
		LINE_BOX: ['━', '┃', '┏', '┓', '┛', '┗'],
		DEFAULT_BOX: ['━', '┃', '╭', '╮', '╯', '╰'],

		drawBox: function(x1, y1, x2, y2, s, ch, co)
		{
			for (var x = x1 + 1; x < x2; x++)
			{
				s.charBuffer[x][y1] = ch[0];
				s.charBuffer[x][y2] = ch[0];
				s.colorBuffer[x][y1] = co;
				s.colorBuffer[x][y2] = co;
			}
			for (var y = y1 + 1; y < y2; y++)
			{
				s.charBuffer[x1][y] = ch[1];
				s.charBuffer[x2][y] = ch[1];
				s.colorBuffer[x1][y] = co;
				s.colorBuffer[x2][y] = co;
			}
			s.charBuffer[x1][y1] = ch[2];
			s.charBuffer[x2][y1] = ch[3];
			s.charBuffer[x2][y2] = ch[4];
			s.charBuffer[x1][y2] = ch[5];
		}
	},
	/*</screen>*/

}