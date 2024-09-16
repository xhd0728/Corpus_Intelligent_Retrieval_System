# mysql
/usr/local/mysql/bin/mysqld_safe –user=mysql &

# redis
redis-server /usr/local/bin/redis.conf

# django
source /root/venv/bin/activate
uwsgi --ini /root/backend/uwsgi.ini

# nginx
nginx -s reload
