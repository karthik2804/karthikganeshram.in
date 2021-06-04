const messaging = firebase.messaging();
let notificationToken
let notificationStatus = JSON.parse(localStorage.getItem("newPostNotification")) || false
let taglist = []
let tagPreferences = {}

let dbDef = {
	dbName: "websiteDB",
	dbStore: "tags",
	dbKeyp: "tagname",
};

let dbConn

const connectDB = (dbDef) => {
	return new Promise((resolve, reject) => {
		req = window.indexedDB.open(dbDef.dbName, dbDef.dbVer)
		req.onsuccess = (ev) => {
			dbDef.dbCon = ev.target.result
			resolve()
		}
		req.onupgradeneeded = (event) => {
			dbDef.dbCon = event.target.result
			dbDef.dbCon.createObjectStore('tags', { keyPath: 'tagname' })
			resolve()
		}
		req.onerror = (e) => {
			reject(e)
		}
	})
}

const readDB = (dbDef, key) => {
	return new Promise((resolve, reject) => {
		var trx = dbDef.dbCon.transaction([dbDef.dbStore]).objectStore(dbDef.dbStore)
		trx = trx.get(key)
		trx.onsuccess = (r) => {
			if (r.target.result === undefined) {
				resolve(undefined)
			} else {
				resolve(r.target.result)
			}
		}
		trx.onerror = (e) => {
			reject(e);
		}
	})
}

const updateDB = (dbDef, data) => {
	return new Promise((resolve, reject) => {
		let trx = dbDef.dbCon.transaction([dbDef.dbStore], "readwrite").objectStore(dbDef.dbStore);
		// Attempt to fetch the object row based on key
		const upd = trx.put(data);
		upd.onsuccess = (e) => {
			resolve(`[updateDB] ${dbDef.dbName}, updated ${data.tagname} `);
		}
		trx.onerror = (e) => {
			reject(e);
		}
	});
}

function getTaglist() {
	let temp = []
	let tags = document.getElementsByName("tagList")
	for (i = 0; i < tags.length; i++) {
		temp.push(tags[i].id)
	}
	return temp
}

async function updateTagNotificationPreference(tag) {
	tagPreferences[tag + "-notify"] = document.getElementById(tag + "-notify").checked
	await updateDB(dbDef, { tagname: tag + "-notify", status: tagPreferences[tag + "-notify"] })
}


let notifyApiUrl = "https://karthikganeshram.in/api/notify/"

const notifyBell = document.getElementById("notifyBell")
const notificationToggleSwitch = document.getElementById("notificationToggleSwitch")
const notificationOverlay = document.getElementById("notificationOverlay")
notificationToggleSwitch.checked = notificationStatus

notificationOverlay.addEventListener("click", () => { toggleNotificationMenu() })

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
		notificationToken = await getToken()
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
			console.log("success")

			notificationStatus = (action === "sub" ? true : false)
			updateDB(dbDef, { tagname: "newPost", status: notificationStatus })
			notificationStatus ? notifyBell.classList.add("active") : notifyBell.classList.remove("active")
			notificationToggleSwitch.checked = notificationStatus
		}
	})
}

function toggleNotificationMenu() {
	notifyDropDown.classList.toggle("active")
}

async function toggleNotification() {
	if (notificationToggleSwitch.checked) {
		enableNotifications()
	}
	else {
		disableNotifications()
	}
}


const main = async () => {
	await connectDB(dbDef)
	taglist = getTaglist()
	let data
	// send notification request in case 
	if (Notification.permission === "granted") {
		notificationToken = await getToken()
		let res = await fetch(notifyApiUrl + "subStatus", {
			body: JSON.stringify({ "token": notificationToken }),
			headers: { 'Content-Type': 'application/json' },
			method: "POST"
		})
		data = await res.json()
		console.log(data.subStatus)
	}
	// Get tag list and match it to the drop down menu
	let atleastOneChannelSubscribed = false
	await taglist.map(async (k, i) => {
		let temp = await readDB(dbDef, k)
		tagPreferences[k] = false
		if (temp) {
			tagPreferences[k] = temp.status
		}
		else {
			await updateDB(dbDef, { tagname: k, status: false })
		}
		if (tagPreferences[k] == true) { atleastOneChannelSubscribed = true }
		if (i === taglist.length - 1) {
			if (!atleastOneChannelSubscribed) {
				console.log("here")
				disableNotifications()
			}
			else {
				if (data.subStatus) {
					console.log("1")
					enableNotifications()
				}
			}
		}
		document.getElementById(k).checked = tagPreferences[k]
	})

}

console.log("hello")
main()
