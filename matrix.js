
INPUT_HEAD = 'artemk:~ user$ ';



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
			'help': 'Welcome to the console.  Available commands: <br>&nbsp;<span class="blue">about</span>: open my about page <br>&nbsp;<span class="blue">bio</span>: give short bio of Gordon <br>&nbsp;<span class="blue">help</span>: commands <br>&nbsp;<span class="blue">contact</span>: get contact info<br>&nbsp;<span class="blue">',
			'contact': '<span class="blue">&nbsp;Twitter: <a href="https://twitter.com/metrak1bear">@metrak1bear</a></span> <br><span class="red">&nbsp;Email: &nbsp;&nbsp;<a href="artem.karaptyan95@gmail.com">artem.karapetyan95@gmail.com</a></span> <br><span class="orange">&nbsp;Resume: &nbsp;<a href="Artem_Karapetyan_RESUME.pdf"&nbsp;> Resume</a></span> <br>',
			'bio': 'About Artem:<br><br>I\'m a Pace University Student with limitless urn for anything Engineering, Science, and Computers.  I love working in proper teams with a goal in mind weather it be me and some colleague working on class work or me and friend working on a app. I like would call myself an achiever cause I hate the sound of overachiever, makes me feel horrible agriagent.  I am always looking at ways ton learn more and gain more from things I do.',
			'about': openLink('http://about.me/artemkarapetyan/', 'Opening about page in new tab/window...'),
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


$(document).ready(initConsole);

