<?php
/**
 * Copyright © Nguyen Huu The <thenguyen.dev@gmail.com>.
 * See COPYING.txt for license details.
 */

declare(strict_types=1);

namespace Similik\Module\Catalog\Services\Type;


use GraphQL\Type\Definition\InputObjectType;
use function Similik\_mysql;
use function Similik\dispatch_event;
use Similik\Module\Catalog\Services\Type\FilterTool\AttributeFilterType;
use Similik\Module\Graphql\Services\FilterFieldType;
use Similik\Services\Di\Container;

class ProductCollectionFilterType extends InputObjectType
{
    public function __construct(Container $container)
    {
        $config = [
            'name'=> 'ProductCollectionFilter',
            'fields' => function() use($container) {
                $fields = [
                    'id' => $container->get(FilterFieldType::class),
                    'status' => $container->get(FilterFieldType::class),
                    'price' => $container->get(FilterFieldType::class),
                    'stock' => $container->get(FilterFieldType::class),
                    'name' => $container->get(FilterFieldType::class),
                    'sku' => $container->get(FilterFieldType::class),
                    'category' => $container->get(FilterFieldType::class),
                    'limit' => $container->get(FilterFieldType::class),
                    'page' => $container->get(FilterFieldType::class),
                    'sortBy' => $container->get(FilterFieldType::class),
                    'sortOrder' => $container->get(FilterFieldType::class)
                ];
                $conn = _mysql();
                $tmp = $conn->getTable('attribute')
                    ->addFieldToSelect('attribute_code')
                    ->where('is_filterable', '=', 1)
                    ->andWhere('type', 'IN', ['select', 'multiselect']);
                while($row = $tmp->fetch()) {
                    $fields[$row['attribute_code']] = $container->get(FilterFieldType::class);
                }
                dispatch_event('filter.productCollectionFilter.input', [&$fields]);

                return $fields;
            }
        ];
        parent::__construct($config);
    }
}