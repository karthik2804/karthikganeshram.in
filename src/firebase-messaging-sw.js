importScripts('https://www.gstatic.com/firebasejs/8.6.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.2/firebase-messaging.js');

let dbDef = {
	dbName: "websiteDB",
	dbStore: "tags",
	dbKeyp: "tagname",
};

let dbConn

const connectDB = (dbDef) => {
	return new Promise((resolve, reject) => {
		req = indexedDB.open(dbDef.dbName, dbDef.dbVer)
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

var firebaseConfig = {
	apiKey: "AIzaSyBWcHL9f89_ORO15vqm0WzW4SHRl0WYtak",
	authDomain: "karthikganeshram-in.firebaseapp.com",
	projectId: "karthikganeshram-in",
	storageBucket: "karthikganeshram-in.appspot.com",
	messagingSenderId: "329859626245",
	appId: "1:329859626245:web:1b509b008419b2653ff36c",
	measurementId: "G-E1FG0Z88FY"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler((payload) => {
	console.log('[firebase-messaging-sw.js] Received background message ', payload);
	// Customize notification here
	const notificationTitle = payload.data.title;
	const notificationOptions = {
		body: payload.data.body,
		image: payload.data.image,
		icon: "https://karthikganeshram.in/assets/images/logo.png",
		badge: "https://karthikganeshram.in/assets/images/logo.png"
	};

	readDB(dbDef, payload.data.tag + "-notify").then(data => {
		console.log(data.status)
		if (data.status) {
			self.registration.showNotification(notificationTitle,
				notificationOptions);
		}
		else {
			console.log("rejected by user")
		}
	})
});

(async () => {
	await connectDB(dbDef)
	console.log(await readDB(dbDef, "General-notify"))
})()