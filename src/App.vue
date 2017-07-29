<template>
<!-- Don't drop "q-app" class -->
<div id="q-app">
	<q-layout>
		<q-toolbar slot="header">
			<q-btn flat @click="$refs.layout.toggleLeft()">
				<q-icon name="menu" />
			</q-btn>
		
			<q-toolbar-title>
				Quasar App
				<!-- <div slot="subtitle">Running on Quasar v{{$q.version}}</div> -->
			</q-toolbar-title>
		</q-toolbar>

		<router-view />
	</q-layout>
</div>
</template>

<script>
import {
	QLayout,
	QToolbar,
	QToolbarTitle,
	QBtn,
	QIcon
} from "quasar";

export default {
	components: {
		QLayout,
		QToolbar,
		QToolbarTitle,
		QBtn,
		QIcon
	}
};
</script>

<style></style>
