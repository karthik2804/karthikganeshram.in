const messaging = firebase.messaging();
let notificationToken
let notificationStatus = JSON.parse(localStorage.getItem("newPostNotification")) || false


let notifyApiUrl = "https://karthikganeshram.in/api/notify/"

const notifyBell = document.getElementById("notifyBell")
const notifyText = document.getElementById("notifyText")

function subscribteTopic() {
	subUnsub("sub")
}
async function getToken() {
	let token = await messaging.getToken({ vapidKey: "BMV6QkbnJY8csTYdx_kFcODHoFs2qWCkDbwvs0u7IJ-3F5Rw2MOvJyKUIqZ1pR_nt-tNu_cJKefGoM81t9DFLzg" })
	return token
}

async function enableNotifications() {
	if (Notification.permission === "granted") {
		notificationToken = await getToken()
		subscribteTopic()
	}
	else if (Notification.permission === "blocked") {
		alert("Notification permissions have been blocked, enable notifications permission manually")
	}
	else {
		alert("Now you will be asked for notification permissions")
		subscribteTopic()
	}
}

async function disableNotifications() {
	notificationToken = await getToken()
	subUnsub("unsub")
}

messaging.onMessage((payload) => {
	console.log('Message received. ', payload);
});

function subUnsub(action) {
	fetch(notifyApiUrl + action, {
		body: JSON.stringify({ "token": notificationToken }),
		headers: {
			'Content-Type': 'application/json'
		},
		method: "POST"
	}).then(res => res.json()).then(data => {
		if (data.results === "success") {
			notificationStatus = (action === "sub" ? true : false)
			localStorage.setItem("newPostNotification", notificationStatus)
			notifyText.innerText = "Notifications " + (notificationStatus ? "on" : "off")
			notificationStatus ? notifyBell.classList.add("active") : notifyBell.classList.remove("active") 
		}
	})
}

async function toggleNotification() {
	if (notificationStatus) {
		disableNotifications()
	}
	else {
		enableNotifications()
	}
}


async function main() {
	if (Notification.permission === "granted") {
		notificationToken = await getToken()
		if (notificationStatus) {
			enableNotifications()
		}
		else {
			fetch(notifyApiUrl + "subStatus", {
				body: JSON.stringify({ "token": notificationToken }),
				headers: {
					'Content-Type': 'application/json'
				},
				method: "POST"
			}).then(res => res.json()).then(data => {
					if(data.subStatus) {
						enableNotifications()
					}
			})
		}
	}
	else {
		notificationStatus = false
	}
}

main()