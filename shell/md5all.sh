#! /bin/bash
# md5 all files

find . -type f | sed 's/^\(.*\)/md5sum \1 > \1.md5/' | sh -x
