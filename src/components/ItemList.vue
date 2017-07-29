<template>
<div class="layout-padding">
	<q-list highlight link separator>
		<q-list-header>Shopping items</q-list-header>
		<q-item tag="label" v-for="i in 20" :key="i">
			<q-item-side>
				<q-checkbox v-model="checked"></q-checkbox>
			</q-item-side>
			<q-item-main>
				<q-item-tile label>Hello</q-item-tile>
				<q-item-tile sublabel>Small text</q-item-tile>
			</q-item-main>
		</q-item>
	</q-list>

	<q-fixed-position corner="bottom-right" :offset="[18, 18]">
		<q-btn round color="primary">
			<q-icon name="add"></q-icon>
		</q-btn>
	</q-fixed-position>
</div>
</template>

<script>
import {
	QBtn,
	QCheckbox,
	QFixedPosition,
	QIcon,
	QList,
	QListHeader,
	QItem,
	QItemMain,
	QItemSide,
	QItemTile
} from "quasar";

export default {
	name: "itemList",
	components: {
		QBtn,
		QCheckbox,
		QFixedPosition,
		QIcon,
		QList,
		QListHeader,
		QItem,
		QItemMain,
		QItemSide,
		QItemTile
	},
	data() {
		return {
			checked: false
		};
	}
};
</script>

<style>
</style>
