#!/bin/bash
sudo apt update
sudo apt install php-cli unzip -y
cd ~
curl -sS https://getcomposer.org/installer -o composer-setup.php
sudo php composer-setup.php --install-dir=/usr/local/bin --filename=composer
cd /var/www/
sudo mkdir devops
sudo chown -r www-data:www-data devops
cd devops
composer install -y
php bin/console d:d:c
