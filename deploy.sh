#!/bin/bash
expected_dir="return-of-the-starcr"
dir=`basename $PWD`
if [[ $dir != $expected_dir ]] ; then
	echo cd to the $expected_dir dir.;
	exit 1;
fi
rsync -avz --delete --exclude .git --delete-excluded . \
	nko@nko:/home/nko/deploy
ssh nko@nko 'kill -9 `pgrep node`; sudo node /home/nko/deploy/server.js'