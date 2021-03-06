<?php
/**
 * Copyright © Nguyen Huu The <thenguyen.dev@gmail.com>.
 * See COPYING.txt for license details.
 */

declare(strict_types=1);

namespace Similik\Module\Discount\Middleware\Edit;

use function Similik\get_js_file_url;
use Similik\Module\Graphql\Services\GraphqlExecutor;
use Similik\Services\Http\Request;
use Similik\Services\Http\Response;
use Similik\Middleware\MiddlewareAbstract;
use Similik\Services\Routing\Router;

class FormMiddleware extends MiddlewareAbstract
{
    /**
     * @param Request $request
     * @param Response $response
     * @param null $delegate
     * @return mixed
     */
    public function __invoke(Request $request, Response $response, $delegate = null)
    {
        if($request->attributes->get('_matched_route') == 'coupon.edit')
            $this->getContainer()
            ->get(GraphqlExecutor::class)
            ->waitToExecute([
                "query"=> <<< QUERY
                    {
                        coupon (id: {$request->get('id')}) {
                            coupon_id
                            status
                            description
                            discount_amount
                            free_shipping
                            discount_type
                            coupon
                            used_time
                            target_products
                            condition
                            user_condition
                            buyx_gety
                            max_uses_time_per_coupon
                            max_uses_time_per_customer
                            start_date
                            end_date
                        }
                    }
QUERY
            ])
            ->then(function($result) use ($request, $response) {
                $advancedPrice = [];
                /**@var \GraphQL\Executor\ExecutionResult $result */
                if (isset($result->data['coupon'])) {
                    $response->addWidget(
                        'coupon_edit_form',
                        'content',
                        10,
                        get_js_file_url("production/discount/edit/coupon_form.js", true),
                        array_merge($result->data['coupon'],
                            [
                                "action"=> $this->getContainer()->get(Router::class)->generateUrl("coupon.save", ['id'=>$request->attributes->get('id', null)])
                            ]
                        )
                    );
                }
            });
        else
            $response->addWidget(
                'coupon_edit_form',
                'content',
                10,
                get_js_file_url("production/discount/edit/coupon_form.js", true),
                [
                    "action"=> $this->getContainer()->get(Router::class)->generateUrl("coupon.save", ['id'=>$request->attributes->get('id', null)])
                ]
            );
        return $delegate;
    }
}
