const noComments = document.getElementById("no-comments")
const commentSection = document.getElementById("commentSection")
const pageUrl = window.location.pathname
let visibleComments = []

const readUrl = "https://docs.google.com/spreadsheets/d/1icmUfD7bj2SUaTwB7tVbjyoOexN90cZd5vwuqXwJUFU"

function strToDate(dtStr) {
	let dateParts = dtStr.split("/");
	let timeParts = dateParts[2].split(" ")[1].split(":")
	dateParts[2] = dateParts[2].split(" ")[0]
	// month is 0-based, that's why we need dataParts[1] - 1
	return dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0], timeParts[0], timeParts[1], timeParts[2])
}
function formatDate(val) {
	var date = strToDate(val)
	var dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
	return date.toLocaleDateString("en-us", dateOptions);
};
function encodeHTML(s) {
	console.log(typeof (s))
	return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;')
}

function csvToArray(text) {
	let p = '', row = [''], ret = [row], i = 0, r = 0, s = !0, l;
	for (l of text) {
		if ('"' === l) {
			if (s && l === p) row[i] += l;
			s = !s;
		} else if (',' === l && s) l = row[++i] = '';
		else if ('\n' === l && s) {
			if ('\r' === p) row[i] = row[i].slice(0, -1);
			row = ret[++r] = [l = '']; i = 0;
		} else row[i] += l;
		p = l;
	}
	return ret;
}
function displayComments(comments) {
	if (comments == null || comments == "") {
		if (visibleComments.length == 0) {
			noComments.classList.add("show")
			return
		}
	}
	let commentList = csvToArray(comments)
	console.log(commentList)
	commentList = commentList.map(function (k) {
		formatDate(k[0])
		k[3] = (k[3] == "TRUE" ? true : false)
		return k
	})
	commentList.forEach(function (element) {
		if (visibleComments.includes(JSON.stringify(element))) {
			return;
		}
		let authorTag = element[3] ? true : false
		let item = document.createElement("div")
		item.className = "comment-item"
		let title = document.createElement("div")
		title.className = "comment-title"
		let titleText = (element[1])
		let name = document.createElement("span")
		let date = document.createElement("div")
		date.className = "comment-date"
		name.className = "comment-name"
		date.append(formatDate(element[0]))
		name.append((titleText))
		title.append(name)
		if (authorTag) {
			let author = document.createElement("small")
			author.className = "author-tag"
			author.innerText = "Author"
			title.append(author)
		}
		title.append(date)
		let comment = document.createElement("div")
		comment.className = "comment-content"
		let commentText = (element[2])
		comment.append(commentText)
		item.append(title)
		item.append(comment)
		commentSection.append(item)

		visibleComments.push(JSON.stringify(element))
		noComments.classList.remove("show")
	})
}

function loadComments() {
	var sqlQuery = encodeURIComponent(`SELECT A, C,D, F WHERE B ="${pageUrl}"`)
	fetch(`${readUrl}/gviz/tq?tqx=out:csv&sheet=comments&tq=${sqlQuery}&headers=0`)
		.then(response => response.text())
		.then(response => displayComments(response))
}

let commentIframe = document.getElementById("comments_hidden_iframe")
commentIframe.addEventListener("load", function () { submit() }, true)

function submit() {
	document.getElementById("comment-content").value = ""
	showSnackbar("Submitted Comment")
	loadComments()
}

function checkform() {
	if (firebase.auth().currentUser) {
		let email = firebase.auth().currentUser.email
		document.getElementById("email").value = (email == "raams.karthik@gmail.com" ? email : "")
		document.getElementById("userName").value = firebase.auth().currentUser.displayName
		return true
	}
	alert("Authenticate with google to sign in")
	return false
}

loadComments()


function authenticate() {
	firebase.auth().getRedirectResult().then(function (result) {
		if (result.credential) {
			// This gives you a Google Access Token.
			var token = result.credential.accessToken;
		}
		var user = result.user;
	});

	// Start a sign in process for an unauthenticated user.
	var provider = new firebase.auth.GoogleAuthProvider();
	provider.addScope('profile');
	provider.addScope('email');
	firebase.auth().signInWithRedirect(provider);
}
firebase.auth().onAuthStateChanged(function (user) {
	if (user) {
		console.log(user)
		document.getElementById('auth').style.display = 'none';
		document.getElementById('comments-form').style.display = 'block';
		let name = document.getElementById("name")
		name.innerText = user.displayName
		let image = document.getElementById("image")
		image.src = user.photoURL
	} else {
		console.log("not logged in")
		document.getElementById('auth').style.display = '';
		document.getElementById('comments-form').style.display = 'none';
	}
})


function signOut() {
	firebase.auth().signOut()
}
