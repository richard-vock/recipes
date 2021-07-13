default:
	hugo server

build:
	hugo --destination docs/

debug:
	hugo server -D

deploy:
	rm -r public/
	hugo
	git add .
	git commit -am "Update live site"
	git push
	rsync -r public/ root@recipes.oglaroon.cc:/srv/http/recipes/public/

update-theme:
	git submodule update --remote --merge

recipe:
	@read -p "Name of recipe (URL variant):  " name; \
	hugo new --kind recipe-bundle recipes/$$name
