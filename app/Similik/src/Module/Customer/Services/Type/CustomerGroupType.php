<?php
/**
 * Copyright © Nguyen Huu The <thenguyen.dev@gmail.com>.
 * See COPYING.txt for license details.
 */

declare(strict_types=1);

namespace Similik\Module\Customer\Services\Type;


use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\ResolveInfo;
use GraphQL\Type\Definition\Type;
use function Similik\dispatch_event;
use Similik\Services\Di\Container;

class CustomerGroupType extends ObjectType
{
    public function __construct(Container $container)
    {
        $config = [
            'name' => 'Customer group',
            'fields' => function() use ($container) {
                $fields = [
                    'customer_group_id' => [
                        'type' => Type::nonNull(Type::id())
                    ],
                    'group_name' => [
                        'type' => Type::nonNull(Type::string())
                    ]
                ];

                dispatch_event('filter.customer_group.type', [&$fields]);

                return $fields;
            },
            'resolveField' => function($value, $args, Container $container, ResolveInfo $info) {
                return isset($value[$info->fieldName]) ? $value[$info->fieldName] : null;
            }
        ];
        parent::__construct($config);
    }
}