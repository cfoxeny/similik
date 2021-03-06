<?php
/**
 * Copyright © Nguyen Huu The <thenguyen.dev@gmail.com>.
 * See COPYING.txt for license details.
 */

declare(strict_types=1);

namespace Similik\Module\Checkout\Middleware\Cart\Remove;

use Similik\Module\Checkout\Services\Cart\Cart;
use Similik\Module\Checkout\Services\Cart\Item;
use Similik\Services\Http\Request;
use Similik\Services\Http\Response;
use Similik\Middleware\MiddlewareAbstract;
use Similik\Services\Routing\Router;

class RemoveItemMiddleware extends MiddlewareAbstract
{
    /**
     * @param Request $request
     * @param Response $response
     * @param null $delegate
     * @return mixed
     */
    public function __invoke(Request $request, Response $response, $delegate = null)
    {
        $this->getContainer()->get(Cart::class)->removeItem(
            $request->attributes->get('id')
        )->then(function(Item $item) use ($response) {
            if(!$item instanceof Item)
                $response->addAlert('cart_add_error', 'error', "Something wrong, please try again");
            else {
                $response->addAlert('cart_remove_success', 'success', "{$item->getData('product_name')} was removed from shopping cart successfully");
                $response->redirect($this->getContainer()->get(Router::class)->generateUrl('checkout.cart'));
            }
        })->otherwise(function($reason) use ($response) {
            $response->addAlert('cart_add_error', 'error', $reason)->notNewPage();
        });

        return $delegate;
    }
}