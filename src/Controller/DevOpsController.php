<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DevOpsController extends AbstractController
{
    /**
     * @Route("/dev/ops", name="app_dev_ops")
     */
    public function index(): Response
    {
        return $this->render('dev_ops/index.html.twig', [
            'controller_name' => 'DevOpsController',
        ]);
    }
}
