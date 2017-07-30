<template>
<div class="layout-padding">
	<div class="row justify-center">
		<q-card class="col-md-6 relative-position">
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
				<q-btn @click="goBack" flat color="negative">Cancel</q-btn>
				<q-btn @click="create" flat color="primary">Create</q-btn>
			</q-card-actions>

			<q-inner-loading :visible="submittingData" color="primary" />
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
	QInnerLoading,
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
		QInnerLoading,
		QInput
	},
	data() {
		return {
			name: "",
			quantity: 1,
			submittingData: true
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

			this.submittingData = true;
			// Disable button whil awaiting...
			await this.$store.addItem(item);
			this.submittingData = false;
			this.goBack();
		},
		goBack() {
			this.$router.push("/");
		}
	}
};
</script>
