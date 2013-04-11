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
			fontWidth = ctx.measureText("█").width ;
			console.log(fontWidth);
			canvas.width = (fontWidth + 1) * _width;
			canvas.height = (fontSize + 1) * _height;

		};

		this.width = function()
		{
			return _width;
		};

		this.height = function()
		{
			return _height;
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

		if (Rogue)
			Rogue.screens[id] = this;
	},

	Animator: function(screen)
	{
		var self = this;
		var killed = false;
		this.targetFPS = 30;
		var fa = [];
		var lastTime = 0;
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