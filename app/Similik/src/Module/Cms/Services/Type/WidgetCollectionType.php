<?php
/**
 * Copyright © Nguyen Huu The <thenguyen.dev@gmail.com>.
 * See COPYING.txt for license details.
 */

declare(strict_types=1);

namespace Similik\Module\Cms\Services\Type;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\ResolveInfo;
use function Similik\dispatch_event;
use Similik\Services\Di\Container;
use GraphQL\Type\Definition\Type;

class WidgetCollectionType extends ObjectType
{
    public function __construct(Container $container)
    {
        $config = [
            'name' => 'widgetCollection',
            'fields' => function() use ($container){
                $fields = [
                    'widgets' => [
                        'type' => Type::listOf($container->get(WidgetType::class))
                    ],
                    'total' => [
                        'type' => Type::nonNull(Type::int())
                    ],
                    'currentFilter' => Type::string()
                ];

                dispatch_event('filter.widgetCollection.type', [&$fields]);

                return $fields;
            },
            'resolveField' => function($value, $args, Container $container, ResolveInfo $info) {
                return isset($value[$info->fieldName]) ? $value[$info->fieldName] : null;
            }
        ];

        parent::__construct($config);
    }
}
