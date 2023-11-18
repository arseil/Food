<?php
$_POST = json_decode(file_get_contents("php://input"), true); // код для декодинга json формата, т.к. php нативно не рабоетет с json
echo var_dump($_POST);