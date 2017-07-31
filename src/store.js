import * as firebase from "firebase";
import Vue from "vue";

let db = firebase.database();
let itemsRef = db.ref("items/");
let itemsHistoryRef = db.ref("itemsHistory/");

const store = {
	state: {
		items: {},
		itemsHistory: {},
		hasLoadedItems: false
	},
	addItem(item) {
		let op = itemsRef.push(item);
		const history = {
			shop: item.shop
		};
		itemsHistoryRef.child(item.name).set(history);
		return op;
	},
	updateItem(itemKey, updatedData) {
		return itemsRef.child(itemKey).update(updatedData);
	},
	deleteItem(itemKey) {
		itemsRef.child(itemKey).remove();
	}
};

itemsRef.once("value", snapshot => {
	let state = store.state;
	let val = snapshot.val();
	if (val) {
		state.items = val;
	}
	state.hasLoadedItems = true;

	itemsRef.on("child_added", data => {
		Vue.set(state.items, data.key, data.val());
	});

	itemsRef.on("child_changed", data => {
		Vue.set(state.items, data.key, data.val());
	});

	itemsRef.on("child_removed", data => {
		Vue.delete(state.items, data.key);
	});
});

itemsHistoryRef.once("value", snapshot => {
	console.log(snapshot.val());
});

export default store;
