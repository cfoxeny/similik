<?php
/**
 * Copyright © Nguyen Huu The <thenguyen.dev@gmail.com>.
 * See COPYING.txt for license details.
 */

declare(strict_types=1);

namespace Similik\Services\Grid;


use function Similik\get_default_language_Id;
use Similik\Services\Db\Table;

class CollectionBuilder
{
    protected $filters = [];

    protected $sortBy;

    protected $sortOrder;

    protected $page;

    protected $limit;

    /**@var Table $collection*/
    protected $collection;

    public function init(Table $table)
    {
        $this->collection = $table;

        return $this;
    }

    public function load()
    {
        $setting = [
            'page'=> $this->page ?? 1,
            'limit'=> $this->limit ?? 20,
            'sort_by'=> $this->sortBy,
            'sort_order'=> $this->sortOrder
        ];

        return $this->collection->fetchAssoc($setting);
    }

    /**
     * @return array
     */
    public function getFilter(): array
    {
        return $this->filters;
    }

    /**
     * @param string $key
     * @param callable $callBack
     * @return self
     */
    public function addFilter(string $key, callable $callBack): self
    {
        if(isset($this->filters[$key]))
            return $this;

        $this->filters[$key] = $callBack;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getSortBy()
    {
        return $this->sortBy;
    }

    /**
     * @param mixed $sortBy
     */
    public function setSortBy($sortBy): void
    {
        $this->sortBy = $sortBy;
    }

    /**
     * @return mixed
     */
    public function getPage()
    {
        return $this->page;
    }

    /**
     * @param mixed $page
     */
    public function setPage($page): void
    {
        $this->page = $page;
    }

    /**
     * @return mixed
     */
    public function getLimit()
    {
        return $this->limit;
    }

    /**
     * @param mixed $limit
     */
    public function setLimit($limit): void
    {
        $this->limit = $limit;
    }

    /**
     * @return mixed
     */
    public function getSortOrder()
    {
        return $this->sortOrder;
    }

    /**
     * @param mixed $sortOrder
     */
    public function setSortOrder($sortOrder): void
    {
        $this->sortOrder = $sortOrder;
    }

    protected function applyFilter($id, $args = [])
    {
        if(isset($this->filters[$id]))
            $this->filters[$id]($args);
    }

    protected function getTotal()
    {
        $collection = clone $this->collection;
        $row = $collection->addFieldToSelect("COUNT(*)", "total")->addFieldToSelect("COUNT(*)", "total")->fetchAllAssoc();
        return count($row);
    }
}