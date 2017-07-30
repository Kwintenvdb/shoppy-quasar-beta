<template>
<div class="layout-padding">
	<q-list highlight link separator>
		<q-list-header>Shopping items</q-list-header>
		
		<item v-for="item in sortedItems"
			:key="item.key"
			:item="item.value"
			:itemKey="item.key"
		></item>

	</q-list>

	<q-fixed-position corner="bottom-right" :offset="[18, 18]">
		<q-btn @click="createItem" round color="primary">
			<q-icon name="add"></q-icon>
		</q-btn>
	</q-fixed-position>
</div>
</template>

<script>
import Item from "./Item";
import {
	QBtn,
	QFixedPosition,
	QIcon,
	QList,
	QListHeader
} from "quasar";

export default {
	name: "itemList",
	components: {
		Item,
		QBtn,
		QFixedPosition,
		QIcon,
		QList,
		QListHeader
	},
	data() {
		return {
			state: this.$store.state,
			transitionName: "list"
		};
	},
	computed: {
		items() {
			return this.state.items;
		},
		sortedItems() {
			let arr = [];
			for (let key in this.items) {
				let item = this.items[key];
				arr.push({ key: key, value: item });
			}

			return arr.sort((a, b) => {
				return b.value.date - a.value.date;
			});
		}
	},
	methods: {
		createItem() {
			this.$router.push("/createItem");
		}
		// showItem(item) {
		// 	return this.showDone === item.finished;
		// }
	}
};
</script>

<style>
</style>
