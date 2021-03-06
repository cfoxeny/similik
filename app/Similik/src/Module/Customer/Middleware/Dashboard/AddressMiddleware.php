<?php
/**
 * Copyright © Nguyen Huu The <thenguyen.dev@gmail.com>.
 * See COPYING.txt for license details.
 */

declare(strict_types=1);

namespace Similik\Module\Customer\Middleware\Dashboard;


use function Similik\generate_url;
use function Similik\get_js_file_url;
use Similik\Middleware\MiddlewareAbstract;
use Similik\Module\Graphql\Services\GraphqlExecutor;
use Similik\Services\Http\Request;
use Similik\Services\Http\Response;
use Similik\Services\Routing\Router;

class AddressMiddleware extends MiddlewareAbstract
{

    public function __invoke(Request $request, Response $response, $delegate = null)
    {
        // Loading data by using GraphQL
        $this->getContainer()
            ->get(GraphqlExecutor::class)
            ->waitToExecute([
                "query"=>"{
                    customerAddresses (customerId: {$request->getCustomer()->getData('customer_id')}) {
                        customer_address_id
                        full_name
                        telephone
                        address_1
                        address_2
                        postcode
                        city
                        province
                        country
                        is_default
                    }
                }"
            ])
            ->then(function($result) use ($request, $response) {
                /**@var \GraphQL\Executor\ExecutionResult $result */
                if(isset($result->data['customerAddresses'])) {
                    $response->addWidget(
                        'customer_address',
                        'content',
                        20,
                        get_js_file_url("production/customer/dashboard/addresses.js", false),
                        [
                            'addresses' => $result->data['customerAddresses'],
                            'deleteUrl' => generate_url('admin.graphql.api', ['type'=>'deleteCustomerAddress']),
                            'updateUrl' => generate_url('admin.graphql.api', ['type'=>'updateCustomerAddress']),
                            'createUrl' => generate_url('admin.graphql.api', ['type'=>'createCustomerAddress'])
                        ]
                    );
                }
            });

        return $delegate;
    }
}