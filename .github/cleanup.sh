docker builder prune --keep-storage 2GB -f & docker image prune -fa & docker container prune -f
# exit with success
exit 0