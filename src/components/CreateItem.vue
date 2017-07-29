<template>
<div class="layout-padding">
	<div class="row justify-center">
		<q-card class="col-md-6">
			<q-card-title>
				Create new shopping item
			</q-card-title>
			
			<q-card-separator></q-card-separator>
			
			<q-card-main>
				<q-input
					autofocus
					float-label="Item name"
					v-model="name"
				></q-input>
				<q-input
					type="number"
					float-label="Quantity"
					v-model="quantity"
					:min="1"
				></q-input>
			</q-card-main>
			
			<q-card-actions align="end">
				<q-btn @click="create" flat color="negative">Cancel</q-btn>
				<q-btn @click="goBack" flat color="primary">Create</q-btn>
			</q-card-actions>
		</q-card>
	</div>
</div>
</template>

<script>
import {
	QBtn,
	QCard,
	QCardActions,
	QCardMain,
	QCardTitle,
	QCardSeparator,
	QInput
} from "quasar";

export default {
	name: "createItem",
	components: {
		QBtn,
		QCard,
		QCardActions,
		QCardMain,
		QCardTitle,
		QCardSeparator,
		QInput
	},
	data() {
		return {
			name: "",
			quantity: 1,
			rules: {
				required: (value) => !!value || "Required."
			}
		};
	},

	methods: {
		async create() {
			const item = {
				name: this.name,
				quantity: this.quantity,
				finished: false,
				date: Date.now()
			};
			// Disable button whil awaiting...
			await this.$store.addItem(item);
			this.goBack();
		},
		goBack() {
			this.$router.push({ path: "/" });
		}
	}
};
</script>
