#! /bin/bash
# commit files

svn st | cat -n

printf '>'
read args

if [ 'q' = "$args" ]
then
    echo 'bye~'
    exit
fi

for i in $args
do
    var="$var,$i"
done

var=${var:1}
if [ "${var:0:1}" = 'e' ]
then
    svn st | awk -v args=${var:2} 'BEGIN{split(args, tmp, ","); for (k in tmp) rows[tmp[k]] = 1} {if (!(NR in rows)) print $2}' > ~/tmp/commit
else
    svn st | awk -v args=${var} 'BEGIN{split(args, tmp, ","); for (k in tmp) rows[tmp[k]] = 1} {if (NR in rows) print $2}' > ~/tmp/commit
fi
svn ci --targets ~/tmp/commit
