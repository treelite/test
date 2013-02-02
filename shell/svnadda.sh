#! /bin/bash
# add all files

svn st | grep ? | awk '{print $2}' | xargs svn add
