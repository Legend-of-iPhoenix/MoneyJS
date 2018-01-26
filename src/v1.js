var $$$ = new (function() {
	this.get = function(s) {
		return 1==document.querySelectorAll(s).length?document.querySelector(s):document.querySelectorAll(s);
	}
	this.keyWithValue = function(j, v) {
		return Object.keys(j).find(key => j[key] === v);
	}
	this.append = function(d_s,t,flags){
		flags = flags ? flags : {};
		var nL=flags.newline||flags.n;
		var m=flags.mono||flags.m;
		var i=flags.italic||flags.i;
		var b=flags.bold||flags.b;
		var u=flags.underline||flags.u;
		t=this.cleanse(t);
		t=m?"<pre>"+t+"</pre>":t;
		t=i?"<em>"+t+"</em>":t;
		t=b?"<strong>"+t+"</strong>":t;
		t=u?"<u>"+t+"</u>":t;
		d_s.innerHTML += nL?"<br />"+t:t;
	}
	this.cleanse = function(t) {
		var n = document.createElement("p");
  	n.innerText = t;
  	return n.innerHTML;
	}
})();