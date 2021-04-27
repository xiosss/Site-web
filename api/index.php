<?php
    use Psr\Http\Message\ResponseInterface as Response;
    use Psr\Http\Message\ServerRequestInterface as Request;
    use Slim\Exception\NotFoundException;
    use \Firebase\JWT\JWT;
    use Slim\Container;

    require 'vendor/autoload.php';
    require_once __DIR__ . '/bootstrap.php';
    const JWT_SECRET = "hugofuchs";
    $configuration = [
        'settings' => [
            'displayErrorDetails' => true,
        ],
    ];
    $c = new Container($configuration);
    $app = new App($c);

    

    function addCorsHeaders (Response $response) : Response {

        $response = $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', '*')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
            ->withHeader('Access-Control-Allow-Credentials', 'true');
    
        return $response;
    }

    $options = [
        "attribute" => "token",
        "header" => "Authorization",
        "regexp" => "/Bearer\s+(.*)$/i",
        "secure" => false,
        "algorithm" => ["HS256"],
        "secret" => JWT_SECRET,
        "path" => ["/api"],
        "ignore" => ["/hello","/api/hello","/api/login","/api/createUser"],
        "error" => function ($response, $arguments) {
            $data = array('ERREUR' => 'Connexion', 'ERREUR' => 'JWT Non valide');
            $response = $response->withStatus(401);
            return $response->withHeader("Content-Type", "application/json")->getBody()->write(json_encode($data));
        }
    ];
    
    $app->post('/login', function (Request $request, Response $response, $args) {
        $issuedAt = time();
        $expirationTime = $issuedAt + 60;
        $payload = array(
            'userid' => "12345",
            'email' => "hugo.haenel@live.fr",
            'pseudo' => "hugo67",
            'iat' => $issuedAt,
            'exp' => $expirationTime
        );
    
        $token_jwt = JWT::encode($payload,JWT_SECRET, "HS256");
        $response = $response->withHeader("Authorization", "Bearer {$token_jwt}");
        return $response;
    });


    $app->get('/client/{id}', function (Request $request, Response $response, $args) {
        $array = [];
        $array ["nom"] = "fuchs";
        $array ["prenom"] = "hugo";
        
        $response->getBody()->write(json_encode ($array));
        return $response;
    });

    $app->get('/hello/{name}',
    function (Request $resquest, Response $response,$args) {
            $array = [];
            $array ["nom"] = $args['name'];
            return $response->getBody()->write(json_encode($array));
    
    });

    $app->get('/catalogue', function (Request $request, Response $response, $args) {
    
        global $entityManager;
    
        $catalogueRepository = $entityManager->getRepository('Catalogue');
        $catalogue = $catalogueRepository->findAll();
    
    
        $data = [];
    
        foreach ($catalogue as $e) {
            $elem = [];
            $elem ["ref"] = $e->getRef();
            $elem ["titre"] = $e->getTitre ();
            $elem ["prix"] = $e->getPrix ();
    
            array_push ($data,$elem);
        }
    
        $response = $response
        ->withHeader("Content-Type", "application/json;charset=utf-8");
    
        
        $response->getBody()->write(json_encode($data));
        return $response;
    });

    $app->add(new Tuupola\Middleware\JwtAuthentication($options));
    $app->run ();

?>

