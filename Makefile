default:
	hugo server

build:
	hugo --destination docs/

debug:
	hugo server -D

deploy:
	rm -r public/
	hugo
	git add public/
	git commit -m "Update live site"
	git push

update-theme:
	git submodule update --remote --merge
