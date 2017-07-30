<template>
<div>
	<q-card>
		<q-list highlight link separator>
			<q-list-header>Shopping items</q-list-header>
			
			<item v-for="item in sortedItems"
				:key="item.key"
				:item="item.value"
				:itemKey="item.key"
			></item>

			<!-- Give this padding like item -->
			<center v-if="showLoading">
				<q-spinner color="primary" :size="40" />
			</center>
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
		}
		// showItem(item) {
		// 	return this.showDone === item.finished;
		// }
	}
};
</script>

<style>
</style>
