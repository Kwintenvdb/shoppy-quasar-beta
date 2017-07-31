<template>
<q-item>
	<q-item-side>
		<q-checkbox :value="dirtyFinished" @change="onCheck"></q-checkbox>
	</q-item-side>

	<q-item-main :class="dirtyFinished ? 'item-text' : ''">
		<q-item-tile label>{{ item.name }} <small class="light-paragraph">({{ item.quantity }})</small></q-item-tile>
		<q-item-tile sublabel>from {{ item.shop }}</q-item-tile>
	</q-item-main>

	<q-item-side right icon="more_vert">
		<q-popover ref="popover">
			<q-list link no-border>
				<q-item @click="$refs.popover.close()">
					<q-item-main label="Edit" />
				</q-item>
				<q-item @click="deleteItem">
					<q-item-main label="Delete" />
				</q-item>
			</q-list>
		</q-popover>
	</q-item-side>
</q-item>
</template>

<script>
import {
	QCheckbox,
	QChip,
	QItem,
	QItemMain,
	QItemSide,
	QItemTile,
	QList,
	QPopover
} from "quasar";

export default {
	name: "item",
	props: ["item", "itemKey"],
	components: {
		QCheckbox,
		QChip,
		QItem,
		QItemMain,
		QItemSide,
		QItemTile,
		QList,
		QPopover
	},
	data() {
		return {
			dirtyFinished: this.item.finished
		};
	},
	methods: {
		onCheck(checked) {
			this.dirtyFinished = !checked;
			const updatedData = {
				finished: this.dirtyFinished
			};
			setTimeout(() => {
				this.$store.updateItem(this.itemKey, updatedData);
			}, 300);
		},
		deleteItem() {
			this.$store.deleteItem(this.itemKey);
		}
	}
};
</script>

<style>
.item-text {
}
</style>
