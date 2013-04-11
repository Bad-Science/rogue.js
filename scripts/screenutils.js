Rogue.ScreenUtils =
{
	// DOUBLE_LINE_BOX: ['═', '║', '╔', '╗', '╝', '╚'],

	// LINE_BOX: ['━', '┃', '┏', '┓', '┛', '┗'],

	// DEFAULT_BOX: ['━', '┃', '╭', '╮', '╯', '╰'],

	// ۩ ሰ 
	// ፡ ። ፣ ፤ ፥ ፦ ፧ ፨ 
	// ᚁ ᚂ ᚃ ᚄ ᚅ ᚆ ᚇ ᚈ ᚉ ᚊ ᚘ ᚙ

	BLOCK_BOX: ['▀', '▄', '▌', '▐', '▛', '▜', '▟', '▙'],

	SOLID_BLOCK_BOX: ['█', '█', '█', '█', '█', '█', '█', '█'],
	
	drawRect: function(x1, y1, x2, y2, s, ch, co)
	{
		for (var x = x1 + 1; x < x2; x++)
		{
			s.charBuffer[x][y1] = ch[0];
			s.charBuffer[x][y2] = ch[1];
			s.colorBuffer[x][y1] = co;
			s.colorBuffer[x][y2] = co;
		}
		for (var y = y1 + 1; y < y2; y++)
		{
			s.charBuffer[x1][y] = ch[2];
			s.charBuffer[x2][y] = ch[3];
			s.colorBuffer[x1][y] = co;
			s.colorBuffer[x2][y] = co;
		}
		s.charBuffer[x1][y1] = ch[4];
		s.charBuffer[x2][y1] = ch[5];
		s.charBuffer[x2][y2] = ch[6];
		s.charBuffer[x1][y2] = ch[7];
		s.colorBuffer[x1][y1] = co;
		s.colorBuffer[x2][y1] = co;
		s.colorBuffer[x2][y2] = co;
		s.colorBuffer[x1][y2] = co;
		return {x1: x1, y1: y1, x2: x2, y2: y2};
	},

	fillRect: function(x1, y1, x2, y2, s, ch, co)
	{
		for (var x = x1; x <= x2; x++)
		{
			for (var y = y1; y <= y2; y++)
			{
				s.charBuffer[x][y] = ch;
				s.colorBuffer[x][y] = co;
			}
		}
	},

	drawString: function(st, co, x, y, s)
	{
		for (var i = 0; i < st.length && i + x < s.width(); i++)
		{
			s.charBuffer[i + x][y] = st[i];
			s.colorBuffer[i + x][y] = co;
		}
	},
};