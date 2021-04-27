<?php
use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;
date_default_timezone_set('Europe/Paris');
require_once "vendor/autoload.php";
$isDevMode = true;
$config = Setup::createYAMLMetadataConfiguration(array(__DIR__ . "/config/yaml"), $isDevMode);
$conn = array(
'host' => 'ec2-54-216-185-51.eu-west-1.compute.amazonaws.com',
'driver' => 'pdo_pgsql',
'user' => 'rricxqsqjsjfiw',
'password' => 'fabc4f7d1e2d88ebfaa29e77f378290711c9d927d65085d7418e095fbed320ec',
'dbname' => 'd47f20qdp3aa1t',
'port' => '5432'
);
$entityManager = EntityManager::create($conn, $config);