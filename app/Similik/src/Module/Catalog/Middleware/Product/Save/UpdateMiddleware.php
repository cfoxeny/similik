<?php
/**
 * Copyright © Nguyen Huu The <thenguyen.dev@gmail.com>.
 * See COPYING.txt for license details.
 */

declare(strict_types=1);

namespace Similik\Module\Catalog\Middleware\Product\Save;

use function Similik\get_default_language_Id;
use Similik\Module\Catalog\Services\ProductMutator;
use Similik\Services\Http\Request;
use Similik\Services\Http\Response;
use Similik\Middleware\MiddlewareAbstract;
use Similik\Services\Routing\Router;
use Symfony\Component\HttpFoundation\Session\Session;

class UpdateMiddleware extends MiddlewareAbstract
{
    /**
     * @param Request $request
     * @param Response $response
     * @param array|null $data
     * @return mixed
     */
    public function __invoke(Request $request, Response $response, array $data = null)
    {
        try {
            if($request->get('id', null) == null)
                return $data;
            $this->getContainer()
                ->get(ProductMutator::class)
                ->updateProduct(
                    (int) $request->get('id', null),
                    (int) $request->query->get('language', get_default_language_Id()),
                    $data
                );
            $this->getContainer()->get(Session::class)->getFlashBag()->add('success', 'Product has been saved');
            $response->redirect($this->getContainer()->get(Router::class)->generateUrl('product.grid'));

            return $response;
        } catch(\Exception $e) {
            $response->addAlert('product_add_error', 'error', $e->getMessage())->notNewPage();

            return $response;
        }
    }
}