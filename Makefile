src_dir := src
dist_dir := out

.PHONY: clean
clean:
	rm -rf $(dist_dir)

#--------------------------------
# dev targets
#--------------------------------

.PHONY: run_server
run_server:
	npx http-server $(dist_dir) \
		-c-1 # no cache

.PHONY: build_js
build_js:
	npx rollup $(src_dir)/index.ts \
		--file $(dist_dir)/index.js \
		--format iife \
		--sourcemap inline \
		--plugin typescript \
		--plugin "node-resolve={extensions: ['.ts']}" \
		--no-watch.clearScreen \
		--watch.onStart "find $(dist_dir) -name \"*.js\" -type f -delete" \
		--watch

.PHONY: build_css
build_css:
	npx postcss $(src_dir)/styles/index.css \
		--output ./out/styles.css \
		--watch

.PHONY: dev
dev: clean
	@mkdir -p $(dist_dir)
	@cp $(src_dir)/index.html $(dist_dir)/index.html
	npx concurrently --kill-others --raw \
		"make build_js" \
		"make build_css" \
		"make run_server"
