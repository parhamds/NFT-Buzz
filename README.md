# SQL Part

### create MY-SQL DB
```
sudo apt-get install mysql-server
sudo mysql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password by 'YtSZaJ?%TVs2@RR';
```
exit with crtl+z
```
sudo mysql_secure_installation utility
```
follow the sequence
  * y
  * 0
  * n
  * y
  * n
  * y
  * y
```
sudo ufw enable
y
sudo ufw allow mysql
sudo ufw allow ssh
sudo vim /etc/mysql/mysql.conf.d/mysqld.cnf
```
comment out binding ip s
```
sudo systemctl start mysql
sudo systemctl enable mysql
sudo systemctl restart mysql
sudo mysql -u root -p
create user "root"@"%" identified by "YtSZaJ?%TVs2@RR";
ALTER USER "root"@"%" IDENTIFIED WITH mysql_native_password BY 'YtSZaJ?%TVs2@RR';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%';
```
exit with crtl+z
connect to DB through workbench, then
    * server tab -> import data -> import from self-contained -> new -> myapp -> import

### Front and Backend
```
git clone https://github.com/parhamds/NFT-Buzz.git
cd NFT-Buzz/
mv Client/ ../client/
mv Server/ ../server/
cd ../server/
cd server/
sudo apt-get install npm
sudo npm install -g n
n 14.17.3
sudo npm install -g npm@8.5.5
sudo npm install
cd ../client/
sudo npm install
sudo npm install --legacy-peer-deps
cd ../server/
sudo npm install
sudo npm install bcrypt
```
- to check the ports are closed or not
```
sudo apt-get install net-tools
sudo netstat -nlp | grep :3000
sudo netstat -nlp | grep :3001
```
* if not closed : sudo kill -9 PID
```
sudo apt update
sudo apt install nginx
sudo service nginx start
sudo systemctl status nginx
sudo vim /etc/nginx/sites-enabled/default
```
paste next block in it
```
    root /home/ubuntu/client/src; // or root /root/client/src;
        server_name 192.168.56.101;
        location / {
                proxy_pass http://192.168.56.101:3000;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection "upgrade";
                proxy_set_header Host $host;
        }
        location /api {
                proxy_pass http://localhost:3001;
        }
```
```
sudo systemctl reload nginx
```
```
run app using PM2
sudo npm install -g pm2
cd server/
sudo pm2 start index.js
cd ../client
sudo pm2 start "npm start"
sudo pm2 startup ubuntu
```
config firewall
```
sudo apt install ufw -y
sudo ufw enable
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https
sudo ufw status
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 3001
sudo ufw allow from 5.199.173.20 to any port 3306 // not sure, check
sudo vim /etc/default/ufw // set ipv6=no
```
config ssl
```
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install python-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
sudo apt install python3 python3-venv libaugeas0
sudo python3 -m venv /opt/certbot/
sudo /opt/certbot/bin/pip install --upgrade pip
sudo /opt/certbot/bin/pip install certbot certbot-nginx
sudo ln -s /opt/certbot/bin/certbot /usr/bin/certbot
sudo certbot --nginx
```
after getting certificate:
1) in client folder change all addresses to : https://nftbuzz.tech/api/
2) in server folder,index.js:
```
	app.use(cors({
    		origin:["https://nftbuzz.tech:3000","http://nftbuzz.tech:3000","http://nftbuzz.tech"],
	...
	const db = mysql.createConnection({
    		user: 'root',
    		host: 'nftbuzz.tech',
```
3) /etc/nginx/sites-enabled/default 
```
server {
        root /root/client/src;
        index index.html index.htm index.nginx-debian.html;
        server_name nftbuzz.tech www.nftbuzz.tech;
        location / {
                proxy_pass http://nftbuzz.tech:3000;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection "upgrade";
                proxy_set_header Host $host;
        }

        location /api/ {
                proxy_pass http://localhost:3001/;
        }
    #listen [::]:443 ssl ipv6only=on; # managed by Certbot
    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/nftbuzz.tech/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/nftbuzz.tech/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}
server {
         if ($host = www.nftbuzz.tech) {
        return 301 https://$host$request_uri;
    }
    if ($host = nftbuzz.tech) {
        return 301 https://$host$request_uri;
    }
        server_name nftbuzz.tech;
        listen 80 default_server;
        #listen [::]:80 default_server;
	return 404;
}
```