<?php
/**
 * Copyright © Nguyen Huu The <thenguyen.dev@gmail.com>.
 * See COPYING.txt for license details.
 */

declare(strict_types=1);

namespace Similik\Module\Cms\Services;


use GraphQL\Type\Definition\ResolveInfo;
use function Similik\_mysql;
use function Similik\get_default_language_Id;
use Similik\Services\Di\Container;
use Similik\Services\Grid\CollectionBuilder;
use Similik\Services\Http\Request;

class WidgetCollection extends CollectionBuilder
{
    /**@var Container $container*/
    protected $container;

    public function __construct(Container $container)
    {
        $this->container = $container;
        $collection = _mysql()->getTable('cms_widget');
        if($this->container->get(Request::class)->isAdmin() == false)
            $collection->where('status', '=', 1);
        $this->init(
            $collection
        );

        $this->defaultFilters();
    }

    protected function defaultFilters()
    {
        $this->addFilter('type', function($args) {
            $this->collection->andWhere('cms_widget.type', $args['operator'], $args['value']);
        });

        $this->addFilter('status', function($args) {
            $this->collection->andWhere('cms_widget.status', $args['operator'], $args['value']);
        });
    }

    public function getData($rootValue, $args, Container $container, ResolveInfo $info)
    {
        $filters = $args['filter'] ?? [];
        foreach ($filters as $key => $arg)
            $this->applyFilter($key, $arg);

        return [
            'widgets' => $this->load(),
            'total' => $this->getTotal(),
            'currentFilter' => json_encode($filters, JSON_NUMERIC_CHECK)
        ];
    }

    public function getCollection()
    {
        return $this->collection;
    }
}