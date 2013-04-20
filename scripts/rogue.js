Object.prototype.subclass = function(parent)
{
	// this.prototype.superclass = parent;
	if (parent.constructor == Function)
	{
		this.prototype = new parent();
		this.prototype.constructor = this;
		this.prototype.parent = parent.prototype;
	}
	else
	{
		this.prototype = parent;
		this.prototype.constructor = this;
		this.prototype.parent = parent;
	}
}

function subclassAll(parent, children)
{
	for (var child in children)
	{
		children[child].subclass(parent);
	}
}


function hexToRGB(h)
{
	return {
		r: parseInt((h.substring(1, 7)).substring(0,2),16),
		g: parseInt((h.substring(1, 7)).substring(2,4),16),
		b: parseInt((h.substring(1, 7)).substring(4,6),16)
	};
}



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
		var _width = w;
		var _height = h;
		var canvas = c;
		var fontSize = f;
		var fontWidth = fontSize;
		this.backgroundColor = "#101010";
		var id = i;
		this.font = (fontSize + "px ProFont");
		this.font = "pf2";
		this.bitmapFont = null;
		this.charBuffer = Rogue.make2DArray(_width, _height);
		this.colorBuffer = Rogue.make2DArray(_width, _height);
		var defaultCharBuffer = Rogue.make2DArray(_width, _height);
		var defaultColorBuffer = Rogue.make2DArray(_width, _height);
		
		this.initBuffers = function()
		{
			for (var x = 0; x < _width; x++)
			{
				for (var y = 0; y < _height; y++)
				{
					self.charBuffer[x][y] = "";
					self.colorBuffer[x][y] = "#336600";
					defaultCharBuffer[x][y] = "";
					defaultColorBuffer[x][y] = "#336600";
				}
			}
			var ctx = getGfx();
			console.log(fontSize);
			fontWidth = ctx.measureText("█").width;
			console.log(fontWidth);
			// canvas.width = (fontWidth + 1) * _width;
			// canvas.height = (fontSize + 1) * _height;

		};

		this.width = function()
		{
			return _width;
		};

		this.height = function()
		{
			return _height;
		};

		this.resizeCanvasToBitmapFont = function()
		{
			canvas.width = self.bitmapFont.charWidth * _width;
			canvas.height = self.bitmapFont.charHeight * _height;
		};
		
		function getGfx()
		{
			if (canvas)
				return canvas.getContext('2d');
			else return null;
		};

		function getRGB(st)
		{
			var i = parseInt(st);

		};
		
		this.draw = function()
		{
			if (canvas)
			{
				var gfx = getGfx();
				gfx.font = self.font;
				for (var x = 0; x < _width; x++)
					for (var y = 0; y < _height; y++)
					{
						gfx.fillStyle = self.colorBuffer[x][y];
						gfx.fillText(self.charBuffer[x][y], x * (fontWidth + 1), (y + 1) * (fontSize + 1));
					}
			}
			else alert("Canvas not found!");
		};

		this.bitmapDraw = function(anim)
		{
			var gfx = getGfx();
			var kill = false;
			if (gfx && self.bitmapFont && self.bitmapFont.ready)
			{
				// kill = true;
				for (var x = 0; x < _width; x++)
				{
					for (var y = 0; y < _height; y++)
					{
						var s = "";
						var data = gfx.createImageData(self.bitmapFont.charWidth, self.bitmapFont.charHeight);
						var ch = self.bitmapFont.store[self.charBuffer[x][y]];
						// console.log(ch);
						var co = hexToRGB(self.colorBuffer[x][y]);
						var num = 0;
						if (ch)
						{
							for (var py = 0; py < self.bitmapFont.charWidth; py++)
							{
								for (var px = 0; px < self.bitmapFont.charHeight; px++)
								{
									if (ch.data[px][py])
									{
										data.data[num] = co.r; num++;
										data.data[num] = co.g; num++;
										data.data[num] = co.b; num++;
										data.data[num] = 255; num++;
										s += '█';
									} else
									{
										s += '.';
										num += 4;
									}
									// console.log("hello");
								}
								// console.log(s);
								s = '';
							}
							// console.log("-----------------------------------");
							gfx.putImageData(data, x * self.bitmapFont.charWidth, y * self.bitmapFont.charHeight);
						}
						else
						{
							// console.log(self.bitmapFont.store);
							// console.log(ch);
							// var kill = true;
						}
					}
				}
				if (kill && anim)
					anim.stop();
			}
		};

		this.clear = function()
		{
			for (var x = 0; x < _width; x++)
				for (var y = 0; y < _height; y++)
				{
					self.charBuffer[x][y] = defaultCharBuffer[x][y];
					self.colorBuffer[x][y] = defaultColorBuffer[x][y];
				}
			var gfx = canvas.getContext('2d');
			gfx.fillStyle = this.backgroundColor;
			gfx.fillRect(0, 0, canvas.width, canvas.height);
		};

		this.setDefault = function()
		{
			for (var x = 0; x < _width; x++)
				for (var y = 0; y < _height; y++)
				{
					defaultCharBuffer[x][y] = self.charBuffer[x][y];
					defaultColorBuffer[x][y] = self.colorBuffer[x][y];
				}
		};

		this.id = function()
		{
			return id;
		};


		this.cursor = function()
		{
			var x = 0;
			var y = 0;

		}();


		if (Rogue)
			Rogue.screens[id] = this;
	},

	BitmapFont: function(src, cwidth, cheight, width, height, canvas)
	{
		var self = this;
		this.img = new Image();
		this.img.src = src;
		this.src = src;
		this.charWidth = cwidth;
		this.charHeight = cheight;
		this.canvas = canvas;
		this.store = {};

		var chars = 
		[
		' ', '☺', '☻', '❤', '◆', '☘', '♠', '●', '◘', '◎', '◙', '♂', '♀', '♪', '♫', '✿',
		'▶', '◀', '↕', '‼', '¶', '§', '▄', '↨', '↑', '↓', '→', '←', '↼', '↔', '▲', '▼',
		' ', '!', '\"', '#', "$", '%', '&', '\'', '(', ')', '*', '+', ',', '-', '.', '/',
		'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ':', ';', '<', '=', '>', '?', 
		'@', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
		'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '[', '\\', ']', '^', '_',
		'', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
		'', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
		'', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
		'', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
		'', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
		'░', '▒', '▓', '│', '┤', '╡ ', '╢', '╖', '╕', '╣', '║', '╗', '╝', '╜', '╛', '┐',
		'└', '┴', '┬', '├', '─', '┼', '╞', '╟', '╚', '╔', '╩', '╦', '╠', '═', '╬', '╧',
		'╨', '╤', '╥', '╙', '╘', '╒', '╓', '╫', '╪', '┘', '┌',
		// '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
		// '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
		
		];

		self.img.onload = function(){
			// this.OK = isImageOk(self.img);
			var ctx = canvas.getContext("2d");
			ctx.drawImage(self.img, 0, 0);
			setTimeout(function(){
				for (var ch in chars)
				{
					var gx = ch % width;
					var gy = Math.floor(ch / height);
					var x1 = gx * cwidth;
					var y1 = gy * cheight;
					if (isFinite(x1) && isFinite(y1))
					{
						// ctx.drawImage(self.img, gx * cwidth, gy * cheight, cwidth, cheight, gx * cwidth, gy * cheight, cwidth, cheight);
						// console.log(x1 + " " + y1);
						// ctx = canvas.getContext("2d");
						var dat = ctx.getImageData(x1, y1, cwidth, cheight);
						var chdat = Rogue.make2DArray(cwidth, cheight);
						var i = 3;
						var num = 0;
						for (var y = 0; y < cheight; y++)
						{
							for (var x = 0; x < cwidth; x++)
							{
								chdat[x][y] = (dat.data[i] != 0 && isFinite(dat.data[i]));
								// console.log(data[i] + " " + i);
								i += 4;
								num++;
							}
						}
						self.store[chars[ch]] = {num: ch, data: chdat, ch: chars[ch]};
					}
				} self.ready = true;
			}, 1000);
		}

		this.getChar = function(ch)
		{

		};

		function Char(num)
		{
			var self_char = this;
			
		}
	},

	Animator: function(screen)
	{
		var self = this;
		var killed = false;
		this.targetFPS = 30;
		var fa = [];
		var lastTime = 0;
		this.screen = screen;
		var animFunc = function()
		{
			screen.clear();
			screen.draw();
		};

		this.start = function(func)
		{
			if (func)
				animFunc = func;
			killed = false;
			animate();
		};

		this.stop = function()
		{
			killed = true;
		};

		this.FPS = function(frames)
		{
			var t = 0;
			frames = (frames <= fa.length) ? frames : fa.length;
			for (var f = 0; f < frames; f++)
			{
				t += fa[fa.length - f - 1];
				// console.log(fa[fa.length - f - 1]);
			}
			return ((frames / t) * 1000);
		};

		function animate()
		{
			if (!killed)
			{
				var newTime = new Date().getTime();
				if (!lastTime)
					lastTime = newTime;
				animFunc();
				fa.push((newTime - lastTime));
				if (fa.length > 1000)
					fa.shift();
				lastTime = newTime;
				setTimeout(animate, ((1000 / self.targetFPS) - (new Date().getTime() - lastTime)));
			}
		}
	},
	/*</screen>*/
};