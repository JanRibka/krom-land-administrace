FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    git \
    curl \
    zip \
    unzip \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    && docker-php-ext-install pdo_mysql mysqli mbstring

WORKDIR /var/www/html/api/

RUN ln -s /var/www/html/api/vendor /var/www/html/vendor
RUN pecl install xdebug && docker-php-ext-enable xdebug
