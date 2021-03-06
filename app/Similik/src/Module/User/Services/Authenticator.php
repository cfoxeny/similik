<?php
/**
 * Copyright © Nguyen Huu The <thenguyen.dev@gmail.com>.
 * See COPYING.txt for license details.
 */

declare(strict_types=1);

namespace Similik\Module\User\Services;

use Similik\Services\Db\Processor;
use Similik\Services\Db\Table;
use Similik\Services\Http\Request;

class Authenticator
{
    /** @var Request $request */
    private $request;

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    /** This function takes email and password and verify them and login customer
     * @param $email
     * @param $password
     * @return bool
     */
    public function login($email, $password)
    {
        if($this->request->getSession()->get('user_id', null) != null)
            return true;

        $userTable = new Table('admin_user', new Processor());
        $user = $userTable->where('email', '=', $email)->fetchOneAssoc();
        if($user == false)
            throw new \RuntimeException("Email or password is invalid");

        if (password_verify($password, $user['password'])) {
            $this->request->getSession()->set('user_id', $user['admin_user_id']);
            $this->request->getSession()->set('user_email', $user['email']);
            $this->request->getSession()->save();
            return true;
        } else {
            throw new \RuntimeException("Email or password is invalid");
        }
    }

    protected function validateEmail($email)
    {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return false;
        }
        return true;
    }
}