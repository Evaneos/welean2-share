welean2-share
=============
What if we can share with friends without click pictures, videos... Yes no click, just a drag and drop! No sign in! Even easier than wetransfer!

Installation
============

Nginx
-----

    upstream nodejs {
        server 127.0.0.1:3000;
    }

    server {
        listen 80;
        server_name picanoo.com.dev www.picanoo.com.dev;
        access_log /home/share/site/logs/nginx_access.log;
        error_log /home/share/site/logs/nginx_error.log;
        root /home/matthieu/dev/evaneos/welean/welean2-share/public;

        location ~* ^.+\.(jpg|jpeg|gif|png|ico|css|zip|tgz|gz|rar|bz2|pdf|txt|tar|wav|bmp|rtf|js|flv|swf|html|htm)$ {
            root /home/matthieu/dev/evaneos/welean/welean2-share/public;
            try_files $uri $uri/ @node;
        }

        location / {
            #temp, use @node automatic redirection
            try_files $uri $uri/ @node;
        }

        # pass the request to the node.js server with the correct headers and much more can be added, see nginx config options
        location @node {
            include /etc/nginx/proxy_params;
            proxy_pass http://nodejs;
            client_max_body_size 100M;
        }
    }


Deployment
==========
    ssh share@picanoo.com
    share@share:~$ cd ~/site/www
    share@share:~/site/www$ git pull
    share@share:~/site/www$ make update
    share@share:~/site/www$ ps -ef | grep nodejs
    share@share:~/site/www$ kill pid (gotten from ps)
    share@share:~/site/www$ nohup nodejs src/server/server.js > /home/share/site/logs/output.log &

