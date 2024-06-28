Bun.serve({
	fetch() {
		return new Response("test");
	},
});
