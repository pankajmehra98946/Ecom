<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit48deab2b5c7ad2e6c8538c03ea901d1a
{
    public static $prefixLengthsPsr4 = array (
        'P' => 
        array (
            'Picqer\\Barcode\\' => 15,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Picqer\\Barcode\\' => 
        array (
            0 => __DIR__ . '/..' . '/picqer/php-barcode-generator/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit48deab2b5c7ad2e6c8538c03ea901d1a::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit48deab2b5c7ad2e6c8538c03ea901d1a::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit48deab2b5c7ad2e6c8538c03ea901d1a::$classMap;

        }, null, ClassLoader::class);
    }
}