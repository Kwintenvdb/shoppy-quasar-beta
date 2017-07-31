<template>
<div>
	<q-card>
		<q-list link separator>
			<center v-if="showLoading">
				<q-spinner class="item-spinner" color="primary" :size="40" />
			</center>
			<template v-else>
				<q-list-header>Shopping items</q-list-header>
				
				<item v-for="item in getItems(false)"
					:key="item.key"
					:item="item.value"
					:itemKey="item.key"
				></item>

				<q-list-header>Done items</q-list-header>

				<item v-for="item in getItems(true)"
					:key="item.key"
					:item="item.value"
					:itemKey="item.key"
				></item>
			</template>
			
		</q-list>
	</q-card>

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
	QCard,
	QFixedPosition,
	QIcon,
	QList,
	QListHeader,
	QSpinner
} from "quasar";

export default {
	name: "itemList",
	components: {
		Item,
		QBtn,
		QCard,
		QFixedPosition,
		QIcon,
		QList,
		QListHeader,
		QSpinner
	},
	data() {
		return {
			state: this.$store.state,
			transitionName: "list"
		};
	},
	computed: {
		showLoading() {
			return !this.state.hasLoadedItems;
		},
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
		},
		getItems(done) {
			let items = this.sortedItems;
			let filteredItems = [];
			if (items) {
				for (const item of items) {
					if (item.value.finished === done) {
						filteredItems.push(item);
					}
				}
			}
			return filteredItems;
		}
		// showItem(item) {
		// 	return this.showDone === item.finished;
		// }
	}
};
</script>

<style>
.item-spinner {
	margin: 8px 16px;
}
</style>
