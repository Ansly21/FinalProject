/* ======================================================================
  Author Custom JavaScript
====================================================================== */
// Loop through Array of Objects
var objPeople = [
	{ // Object @ 0 index
		email: "aliya@gmail.com",
		exampleInputPassword1: "html"
	},
	{ // Object @ 1 index
		email: "ansly@gmail.com",
		exampleInputPassword1: "css"
	},
	{ // Object @ 2 index
		email: "benedict@gmail.com",
		exampleInputPassword1: "javascript"
	}

]

function getInfo() {
	var email = document.getElementById('email').value
	var exampleInputPassword1 = document.getElementById('exampleInputPassword1').value

	for(var i = 0; i < objPeople.length; i++) {
		// check is user input matches username and password of a current index of the objPeople array
		if(email == objPeople[i].email && exampleInputPassword1 == objPeople[i].exampleInputPassword1) {
			console.log(email + " is logged in!!!")
			// stop the function if this is found to be true
			return
		}
	}
	console.log("incorrect username or password")
}


function MyFunction() {
	var x = document.getElementById("exampleInputPassword1");
	var y = document.getElementById("hide1");
	var z = document.getElementById("hide2");

	if(x.type === 'password'){
		x.type = "text";
		y.style.display = "block";
		z.style.display = "none"
	}

	else {
		x.type = "password";
		y.style.display = "none";
		z.style.display = "block"
	}
}
