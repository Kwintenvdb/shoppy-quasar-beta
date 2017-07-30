import * as firebase from "firebase";
import Vue from "vue";

let db = firebase.database();
let itemsRef = db.ref("items/");

const store = {
	state: {
		items: {}
	},
	addItem(item) {
		console.log(item);
		return itemsRef.push(item);
	},
	updateItem(itemKey, updatedData) {
		return itemsRef.child(itemKey).update(updatedData);
	},
	deleteItem(item) {
		itemsRef.child(item.key).remove();
	}
};

itemsRef.orderByKey().once("value", snapshot => {
	let val = snapshot.val();
	if (val) {
		store.state.items = val;
	}

	itemsRef.on("child_added", data => {
		Vue.set(store.state.items, data.key, data.val());
	});

	itemsRef.on("child_changed", data => {
		Vue.set(store.state.items, data.key, data.val());
	});

	itemsRef.on("child_removed", data => {
		Vue.delete(store.state.items, data.key);
	});
});

export default store;
