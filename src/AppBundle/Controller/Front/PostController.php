<?php

namespace AppBundle\Controller\Front;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use AppBundle\Entity\Post;

/**
 * Post controller.
 *
 * @Route("/post")
 */
class PostController extends Controller
{

    /**
     * Lists all Post entities.
     *
     * @Route("/", name="post")
     * @Method("GET")
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $entities = $em->getRepository('AppBundle:Post')->findAll();
        $serializer = $this->get('serializer');

        return new Response($serializer->serialize($entities, 'json'));
    }
    /**
     * Creates a new Post entity.
     *
     * @Route("/", name="post_create")
     * @Method("POST")
     */
    public function createAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();

        $post = new Post();
        $post->setContent($request->getContent());

        $em->persist($post);
        $em->flush();

        return new JsonResponse;
    }

    /**
     * Edits an existing Post entity.
     *
     * @Route("/{id}", name="post_update")
     * @Method("PUT")
     */
    public function updateAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('AppBundle:Post')->find($id);

        if (!$entity) {
            return new JsonResponse(array('message' => 'Unable to find Post entity.'), 404);
        }

        $entity->setContent($request->getContent());

        $em->persist($entity);
        $em->flush();

        return new JsonResponse;
    }

    /**
     * Deletes a Post entity.
     *
     * @Route("/{id}", name="post_delete")
     * @Method("DELETE")
     */
    public function deleteAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();
        $post = $em->getRepository('AppBundle:Post')->find($id);

        $em->remove($post);
        $em->flush();

        return new JsonResponse;
    }
}
