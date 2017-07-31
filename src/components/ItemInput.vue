<template>
<div>
	<q-input
		autofocus
		float-label="Item name"
		:value="value"
		@input="onInput"
	></q-input>
</div>
</template>

<script>
import {
	QInput
} from "quasar";

export default {
	name: "itemInput",
	props: ["value"],
	components: {
		QInput
	},
	methods: {
		onInput(e) {
			this.$emit("input", e);
		}
	}
};
</script>
