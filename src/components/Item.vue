<template>
<!-- <transition name="fade">
	<v-list-tile avatar>
		<v-list-tile-action>
			<v-checkbox color="primary" :inputValue="finished" @change="onCheck"></v-checkbox>
		</v-list-tile-action>
		<v-list-tile-content>
			<v-list-tile-title>
				{{ item.name }} <span class="body-1 grey--text">({{ item.quantity }})</span>
			</v-list-tile-title>
		</v-list-tile-content>
	</v-list-tile>
</transition> -->

<q-item tag="label">
	<q-item-side>
		<q-checkbox v-model="dirtyFinished" @change="onCheck"></q-checkbox>
	</q-item-side>
	<q-item-main>
		<q-item-tile label>{{ item.name }} <small>({{ item.quantity }})</small></q-item-tile>
		<q-item-tile sublabel>from {{ item.shop }}</q-item-tile>
	</q-item-main>
</q-item>

</template>

<script>
import {
	QCheckbox,
	QItem,
	QItemMain,
	QItemSide,
	QItemTile
} from "quasar";

export default {
	name: "item",
	props: ["item", "itemKey"],
	components: {
		QCheckbox,
		QItem,
		QItemMain,
		QItemSide,
		QItemTile
	},
	data() {
		return {
			dirtyFinished: this.item.finished
		};
	},
	computed: {
		finished() {
			return this.dirtyFinished;
		}
	},
	methods: {
		onCheck(checked) {
			this.dirtyFinished = checked;
			const updatedData = {
				finished: this.dirtyFinished
			};
			// setTimeout(() => {
			this.$store.updateItem(this.itemKey, updatedData);
			// }, 300);
		}
	}
};
</script>
