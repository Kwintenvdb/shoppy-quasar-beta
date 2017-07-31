import * as firebase from "firebase";
import Vue from "vue";

let db = firebase.database();
let itemsRef = db.ref("items/");

const store = {
	state: {
		items: {},
		hasLoadedItems: false
	},
	addItem(item) {
		return itemsRef.push(item);
	},
	updateItem(itemKey, updatedData) {
		return itemsRef.child(itemKey).update(updatedData);
	},
	deleteItem(itemKey) {
		itemsRef.child(itemKey).remove();
	}
};

itemsRef.orderByKey().once("value", snapshot => {
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

export default store;
