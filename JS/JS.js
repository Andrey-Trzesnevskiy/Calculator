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
	var cur;
	
	if( oper.o1 == 'E') {
		oper.o1 = '0';
		nextOper = false;
	}
	
	if (nextOper && oper.o == '') { 
		oper.o1 = '0'; 								
		cur = 'o1';										
		nextOper = false;
	}

  
  else if (nextOper) {					
		cur = 'o2';				 						
	}
 
  else {												
		cur = 'o1';
	}
	switch (val) {
		case 'C':											
			oper.o1 = '0';
			oper.o2 = '0';
			oper.o = '';
			break;
		case 'CE':
			oper[cur] = '0';						
			break;
 		case ',':
			oper[cur] = (oper[cur].includes('.')) ? oper[cur] : oper[cur]+'.';
 			break;
 			case '.':						
			oper[cur] = (oper[cur].includes('.')) ? oper[cur] : oper[cur]+'.';
 			break;
		default:
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
	else if (val == '=' || oper.o != '' && oper.o2 != '0') {
		r = methods[oper.o](oper.o1, oper.o2); 
		if (val == '=' || val == '√' || val == '+/-' || val == '1/x') {					
			oper.o = '';
		}
    	else {												
			oper.o = val;									
		}
	oper.o1 = r;
	nextOper = true;
	oper.o2 = '0';
	} 
	else if (val == '√' || val == '1/x' || val == '+/-' && oper.o2 == '0') {
		r = methods[oper.o](oper.o1);
		oper.o = '';
		oper.o1 = r;
		nextOper = true;	
		oper.o2 = '0';
	}  

  else {
		oper.o = val;
		nextOper = true;
	}
 
	showRes();
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
	if(event.charCode >= 48 && event.charCode <= 57 || event.charCode == 46){
		var str = String.fromCharCode(event.charCode);
		pressedNum(str);
		}
		else if (event.charCode == 32) {
			pressedNum('C');
		}
		else if (event.charCode == 42 || event.charCode == 43 || event.charCode == 45 || event.charCode == 47 || event.charCode == 61) {
			var str = String.fromCharCode(event.charCode);
			pressedOp(str);
		}
		else if (event.charCode == 115) {
			pressedOp('√')
		}
	
})

});