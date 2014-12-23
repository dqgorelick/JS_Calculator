var keys = document.querySelectorAll('#container span');
var operators = ['+','-','x','÷'];
var decimal = false;
var input = document.querySelector('#inputbox');
var inputVal = document.getElementById('inputbox').innerHTML;
// var mice = {'=':['enter','=']}
// var mice = ['c','shift+c','C','=','enter','x','shift-x','X','÷','/','-','+','p','0','1','2','3','4','5','6','7','8','9','.'];

var keyCommands = {
	'C': 'C',
	'shift+c': 'C',
	'c': 'C',
	'del':'C',
	'backspace':'C',
	'enter':'=',
	'=':'=',
	'shift+x':'*',
	'x':'*',
	'X':'*',
	'*':'*',
	'÷':'/',
	'/':'/',
	'-':'-',
	'+':'+',
	'p':'+',
	'0':'0',
	'1':'1',
	'2':'2',
	'3':'3',
	'4':'4',
	'5':'5',
	'6':'6',
	'7':'7',
	'8':'8',
	'9':'9',
	'.':'.'
};

//ignore browser back function
window.onkeydown = function() {
    var key = event.keyCode || event.charCode;
    if( key == 8 || key == 46 ){
        return false;
    }
};

var bindKey = function (keyPress, command) {
	var $selected = $("[button-data='" + command + "']");
	Mousetrap.bind(keyPress, function(e) {
		$selected.removeClass("active");
		$selected.addClass("active");
	});
	Mousetrap.bind(keyPress, function(e) {
		evaluate(command);
		$selected.removeClass("active");
		console.log(keyPress + " = " + command);
	}, 'keyup');
}

//Calls mousetrap
for(var key in keyCommands) {
	bindKey(key, keyCommands[key]);
}

for(var i=0;i<keys.length; i++){
	keys[i].onclick = function(e){
	var btnVal = this.innerHTML;
	evaluate(btnVal);
	e.preventDefault();
	}

var evaluate = function (btnVal)
{
	var equation = document.getElementById('inputbox').innerHTML;
	var lastChar = equation[equation.length-1];
	if(btnVal == 'C')
	{
		input.innerHTML = '';
		decimal = false;
	}

	else if(btnVal=='='){
		equation = equation.replace(/x/g,'*').replace(/÷/g,'/');

		if(operators.indexOf(lastChar) > -1 || lastChar == '.')
			equation = equation.replace(/.$/,'');

		if(equation)
		input.innerHTML = eval(equation);
	}	
	else if(btnVal=='.')
	{
		if(equation == '' || operators.indexOf(lastChar) > -1)
		{
			input.innerHTML += '0.';
		}
	}
	else if(operators.indexOf(btnVal)>-1)
	{
		if(equation == '' && btnVal == '-')
		{
			input.innerHTML += '-';
		}
		else if(operators.indexOf(lastChar) == -1 && equation!='')
		{
			input.innerHTML += btnVal;
		}
	}
	else{
		input.innerHTML += btnVal;
	}		
};
}