$(document).ready(function(){
var oper = {
	'o1': '0',
	'o' : '',
	'o2': '0'
};

var methods = {
	'+': function(a, b) { return (+a*100 + +b*100)/100; },
	'-': function(a, b) { return (+a*100 - +b*100)/100; },
	'/': function(a, b) {if (b==0) { return 'E'} 
   		else {
    	return ((+a*100) / (+b*100))
  		}
  		},
	'*': function(a, b) { return (+a*100 * +b*100)/10000; },
  '+/-': function(a) {return (a = -a);},
	'√': function(a) {if (a<0) {
    	return 'E'
  		} 
  		else {return Math.sqrt(+a); }},
  	'^': function(a, b) {return Math.pow(+a, +b)},
  	'1/x': function(a){return 100/(+a*100)}	
		}

var nextOper = false;

function getType(elm){
	if( $(elm).parent().hasClass('num') ) {
		return 'num';
	} else {
		return 'op';
	}
}
function getVal(elm){
	return $(elm).html();
}
function showRes() {
	var str = '0';
	
	if( oper.o1 == '0' && oper.o2 == '0' && oper.o == ''){
		str = '0';
	} else if ( oper.o1 != '0' && oper.o == '' && oper.o2 == '0'){
		str = oper.o1;
	} else if ( oper.o1 != '0' && oper.o != '' && oper.o2 == '0' ) {
		str = oper.o1 + ' ' + oper.o;
	} 
  else if ( oper.o1 != '0' && oper.o != '' && oper.o2 != '0' ) {
		str = oper.o1 + ' ' + oper.o + ' ' + oper.o2;
	}
	$('.res').html(str);
}
function pressedNum(val){
	var cur; // сюда запишем ключ элемента обьекта, с которым будем работать
	
	if( oper.o1 == 'E') {
		oper.o1 = '0';
		nextOper = false;
	}
	
	if (nextOper && oper.o == '') { // если флаг включен (должны работать со вторым операндом), но оператор не указан
		oper.o1 = '0'; 								// обнуляем первый операнд
		cur = 'o1';										// указываем его как рабочий
		nextOper = false; 						// снимаем флаг (продолжаем работать с первым, пока не будет нажата кнопка операции)
	}

  
  else if (nextOper) {					// если флаг включен (должны работать со вторым операндом) и оператор указан
		cur = 'o2';				 						// определяем второй операнд как рабочий
	}
 
  else {												// во всех остальных случаях
		cur = 'o1';										// работаем с первым операндом
	}
	switch (val) {
		case 'C':											// нажата кнопка С
			oper.o1 = '0';							// обнуляем все, вместе с оператором
			oper.o2 = '0';
			oper.o = '';
			break;
		case 'CE':										// нажата кнопка СЕ
			oper[cur] = '0';						// обнуляем операнд, который указан как текущий
			break;
 		case ',':											// нажата запятая
			oper[cur] = (oper[cur].includes('.')) ? oper[cur] : oper[cur]+'.';	// дописываем ее в конец строки текущего опреанда
 			break;
 			case '.':											// нажата точка с клавиатуры
			oper[cur] = (oper[cur].includes('.')) ? oper[cur] : oper[cur]+'.';	// дописываем ее в конец строки текущего опреанда
 			break;
		default:											// во всех остальных случаях
			// если текущий операнд равен 0, то меняем его значение на val, или дописываем значение в конец строки
			oper[cur] = (oper[cur] == '0') ? val : oper[cur]+val; 
			break;
	}

	showRes();
}
function pressedOp(val){
	var r;
	
  
if (val == '√') {
    oper.o = val;
    r = methods['√'](oper.o1);
  	}
if (val == '+/-' && oper.o2 == '0'){
	oper.o = val;
	r = methods['+/-'](oper.o1);
	}	
		
if (val == '1/x') {
	oper.o = val;
	r = methods['1/x'](oper.o1);
} 
if( oper.o1 == 'E') {
		oper.o1 = '0';
		nextOper = true;
	}
  
	if (val == '+/-' && oper.o2 != '0') {
		oper.o2 = -oper.o2;
		}
	else if (val == '=' || oper.o != '' && oper.o2 != '0') {	// если нажато "=" или оператор не пустой
		r = methods[oper.o](oper.o1, oper.o2); // считаем, что же у нас получилось	
		if (val == '=' || val == '√' || val == '+/-' || val == '1/x') {					// если было нажато "="
			oper.o = '';									// необходимо сбросить оператор
		}
    	else {												// в остальных случаях
			// ставим оператор который был нажат. 
			// т.е. выполнили операцию с оператором который 
			// был и установили новый, нажатый пользователем
			oper.o = val;									
		}
	oper.o1 = r;			// т.к. мы получили результат, записываем его в первый операнд
	nextOper = true;	// устанавливаем флаг работы со следующим операндом
	oper.o2 = '0';		// второй операнд обнуляем
	} 
	else if (val == '√' || val == '1/x' || val == '+/-' && oper.o2 == '0') {
		r = methods[oper.o](oper.o1);
		oper.o = '';
		oper.o1 = r;
		nextOper = true;	
		oper.o2 = '0';
	}  

  else {													// в остальных случаях
		oper.o = val;										// устанавливаем оператор
		nextOper = true;									// устанавливаем флаг работы со следующим операндом						
	}
 
	showRes();  // выводим результат
}
$('.num').click(function(){
  
});

$('li').click(function(){
	if ( getType(this) == 'num' ) {
		pressedNum(getVal(this));
	} else {
		pressedOp(getVal(this));
	}
	console.log(oper);
 
});

$(document).keypress(function(event){
	if(event.keyCode >= 48 && event.keyCode <= 57 || event.keyCode == 46){
		var str = String.fromCharCode(event.keyCode);
		pressedNum(str);
		}
		else if (event.keyCode == 32) {
			pressedNum('C');
		}
		//else if (event.keyCode == 8) {
			//pressedNum('CE');
		//}
		else if (event.keyCode == 42 || event.keyCode == 43 || event.keyCode == 45 || event.keyCode == 47 || event.keyCode == 61) {
			var str = String.fromCharCode(event.keyCode);
			pressedOp(str);
		}
		else if (event.keyCode == 115) {
			pressedOp('√')
		}
	
})

});