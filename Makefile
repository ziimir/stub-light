src_dir := src
dist_dir := out
js_assets_map_filename := paths-map.json
js_assets_map_path := $(dist_dir)/$(js_assets_map_filename)

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

.PHONY: watch_js
watch_js:
	@mkdir -p $(dist_dir)
	npx rollup --config rollup.config.js \
		--no-watch.clearScreen \
		--watch.onStart "find $(dist_dir) -name \"*.js\" -type f -delete" \
		--watch.onStart "find $(dist_dir) -name \"*.json\" -type f -delete" \
		--watch

.PHONY: watch_css
watch_css:
	npx postcss $(src_dir)/styles/index.css \
		--output $(dist_dir)/styles.css \
		--watch

.PHONY: build_html
build_html:
	npx hbs $(src_dir)/index.hbs \
		--output $(dist_dir) \
		--data $(js_assets_map_path)

.PHONY: watch_html
watch_html:
	npx chokidar $(src_dir)/**/*.hbs $(js_assets_map_path) \
		--command "make build_html"

.PHONY: dev
dev: clean
	@mkdir -p $(dist_dir)
	@touch $(js_assets_map_path) && echo '{"assets": []}' >> $(js_assets_map_path)
	npx concurrently --kill-others --raw \
		"make watch_js" \
		"make watch_css" \
		"make watch_html" \
		"make run_server"
