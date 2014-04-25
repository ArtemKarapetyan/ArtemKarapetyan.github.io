ASCII_BEGIN = 33;
ASCII_END = 126;
CHARS_PER_ROW = Math.floor($(window).width() / 8);
TEXT_LENGTH = CHARS_PER_ROW * 2;
REFRESH_FREQUENCY = 500;

INPUT_HEAD = 'gordn:~ user$ ';


	// regenerates content of the matrix
	function refresh(data) {
		for (var x=0; x < data.length; x++) {
			data[x] = String.fromCharCode(Math.floor((Math.random() * (asciiEnd - asciiBegin)) + asciiBegin))
		}
		return data.join("");
	}

	// determine how many lines we need to fill window
	h = $(window).height();
	lineheight = $(".line").first().height()
	lines = Math.ceil(h / lineheight)

	for (var y=0; y < lines; y++) {
		$("#lines").append($(".line").first().clone())
	}

	// array to contain matrix content
	data = Array(textLength);
	data.length = textLength;

	window.setInterval(function() {
		p = refresh(data);
		// give each line a random slice of the pie
		$(".line").each(function(index, ele) {
			i = Math.floor(Math.random()* (textLength - charsPerRow))
			$(ele).text(p.slice(i, i + charsPerRow))
		})
	}, refreshInterval);
}

function initConsole() {
	// handle special keys:
	$(document).keydown(function(e) {
		key = e.which || e.keyCode;

		// if backspace
		if (key === 8 || key === 46) {
			e.preventDefault();
			return backspace();
		}
	})

	// handle letter keys:
	$(document).keypress(function(e){
		key = e.which || e.keyCode;

		// if enter/return
		if (key === 13) {
			return enter();
		}

		// otherwise, insert char into console
		letter = String.fromCharCode(key)
		lastLine = getLastLine();
		lastLine.html(lastLine.html() + letter)

		// TODO: add blinking cursor
	})

	function backspace() {
		k = getLastLine();
		if (k.html().length > INPUT_HEAD.length) {
			k.html(k.html().slice(0, -1));
		}
	}

	// TODO: implement clear command

	function enter() {
		lastLine = getLastLine()
		input = lastLine.html().slice(INPUT_HEAD.length);
		processInput(input);
		newLine(INPUT_HEAD);
	}
	function processInput(input) {
		commands = {
			'help': 'Welcome to the console.  Available commands: <br>&nbsp;<span class="blue">about</span>: open my about page <br>&nbsp;<span class="blue">bio</span>: give short bio of Gordon <br>&nbsp;<span class="blue">help</span>: commands <br>&nbsp;<span class="blue">contact</span>: get contact info<br>&nbsp;<span class="blue">blog</span>: go to my blog',
			'contact': '<span class="blue">&nbsp;Twitter: <a href="http://www.twitter.com/capable_monkey">@capable_monkey</a></span> <br><span class="red">&nbsp;Email: &nbsp;&nbsp;<a href="mailto:technix1@gmail.com">technix1@gmail.com</a></span> <br>',
			'bio': 'About Gordon:<br><br>I like lists, so I\'ll describe myself with a list.  I\'m an avid explorer of restaurants, a lifelong engineer, a shameless comedian, an occasional writer, a chess player, a fanatic of science and technology, and a thinker. I like calling myself a "thinker" because it sounds really pompous, which is the exact effect I\'m trying to achieve.  Perhaps most important, I\'m a Developer Evangelist at Dwolla. I love working there.',
			'blog': openLink('http://www.sintacks.com/', 'Opening blog in new tab/window...'),
			'about': openLink('http://about.me/gordonzheng', 'Opening about page in new tab/window...'),
		}

		if (input in commands) {
			if (typeof commands[input] === 'function') commands[input]();
			else newLine(commands[input]);
		}
		else if (input.length > 0) {
			newLine('-bash(ish): ' + input + ': command not found');
		}
	}

	function openLink(link, output) {
		// returns partial function which will open link
		return function() {
			newLine(output);
			window.open(link,'_blank');
		}
	}

	function newLine(output) {
		k = getLastLine().clone();
		k.html(output);
		$("#console").append(k);
		// auto scroll down
		$("#console").scrollTop($("#console")[0].scrollHeight)
	}
	function getLastLine() {
		return $("#console").find(".consoleLine").last();
	}
}

function initAll() {
	initMatrix(ASCII_BEGIN, ASCII_END, TEXT_LENGTH, CHARS_PER_ROW, REFRESH_FREQUENCY);
	initConsole();
}

$(document).ready(initAll);

