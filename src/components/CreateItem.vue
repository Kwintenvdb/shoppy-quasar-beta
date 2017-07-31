<template>
<q-card class="relative-position">
	<q-card-title>
		Create new shopping item
	</q-card-title>
	
	<q-card-main>
		<!-- <q-input
			autofocus
			float-label="Item name"
			v-model="name"
		></q-input> -->
		<item-input v-model="name" />
		<q-input
			type="number"
			float-label="Quantity"
			v-model="quantity"
			:min="1"
			:after="[
				{
					icon: 'remove',
					content: true,
					handler: () => addQuantity(-1)
				},
				{
					icon: 'add',
					content: true,
					handler: () => addQuantity(1)
				}
			]"
		></q-input>
		<q-select
			float-label="Shop"
			:options="shopOptions"
			v-model="selectedShop"
		></q-select>
	</q-card-main>
	
	<q-card-actions align="end">
		<q-btn @click="goBack" flat color="negative">Cancel</q-btn>
		<q-btn @click="create" flat color="primary">Create</q-btn>
	</q-card-actions>

	<q-inner-loading :visible="submittingData" color="primary" />
</q-card>
</template>

<script>
import {
	QBtn,
	QCard,
	QCardActions,
	QCardMain,
	QCardTitle,
	// QCardSeparator,
	QInnerLoading,
	QInput,
	QSelect
} from "quasar";
import ItemInput from "./ItemInput";

export default {
	name: "createItem",
	components: {
		ItemInput,
		QBtn,
		QCard,
		QCardActions,
		QCardMain,
		QCardTitle,
		// QCardSeparator,
		QInnerLoading,
		QInput,
		QSelect
	},
	data() {
		return {
			name: "",
			quantity: 1,
			submittingData: false,
			// Create association w/ shop item and shop by default...
			shopOptions: [
				{
					label: "Anywhere",
					value: "Anywhere"
				},
				{
					label: "Hofer",
					value: "Hofer"
				},
				{
					label: "Spar",
					value: "Spar"
				}
			],
			selectedShop: "Anywhere"
		};
	},

	methods: {
		async create() {
			const item = {
				name: this.name,
				quantity: this.quantity,
				shop: this.selectedShop,
				finished: false,
				date: Date.now()
			};

			this.submittingData = true;
			// Disable button whil awaiting...
			await this.$store.addItem(item);
			this.submittingData = false;
			this.goBack();
		},
		goBack() {
			this.$router.push("/");
		},
		addQuantity(amount) {
			let newQuantity = this.quantity + amount;
			this.quantity = Math.max(1, newQuantity);
		}
	}
};
</script>
