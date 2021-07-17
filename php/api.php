<?php 
    header('Access-Control-Allow-Origin: *');    // ACTIONS
    $LIST = 'LIST'; // select all data from db
    $SELECT_NOTE = 'SELECT_NOTE'; // select particular note from db
    $DELETE_NOTE = 'DELETE_NOTE'; // delete note from db
    $UPDATE_NOTE = 'UPDATE_NOTE'; // update note from db
    $INSERT_NOTE = 'INSERT_NOTE'; // update note from db

    // Table Varaiables
    $TABLE_NAME = 'note';
    $COLUMN_TEXT = 'text';

    // Connection object
    $pdo = createConnection();

    //Action Representative
    $action = $_GET['action'];

    // Json Keys
    $code_key = 'code';
    $message_key = 'message';

    if ($action == null || $action == ''){
        $data['code'] = '0';
        $data['message'] = 'action can not be empty';
        $encoded = json_encode($data);
        echo $encoded;
        return;
    }

    createConnection();

    switch($action){
        case $LIST : {
            getNoteList($pdo);
        }
        break;
        case $SELECT_NOTE : {
            selectNote($pdo);
        }
        break;
        case $DELETE_NOTE : {
            deleteNote($pdo);
        }
        break;
        case $UPDATE_NOTE : {
            updateNote($pdo);
        }
        break;
        case $INSERT_NOTE : {
            insertNote($pdo);
        }
        break;
    }

    function createConnection(){
        $serverName = "localhost";
        $userName = "root";
        $dbName = "notes";
        $userPassword = "";

        try {
            $pdo = new PDO("mysql:host=$serverName;dbname=$dbName" , $userName , $userPassword);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);    
            return $pdo;
        }catch (PDOException $e) {
            echo $e.message;
            return null;
        }        
    }

    function deleteNote($pdo){
        $id = $_GET['id'];
        
        if ($id == '' || $id == null) {
            $data['code'] = '0';
            $data['message'] = 'id can not be null';
            $encoded = json_encode($data);
            echo $encoded;
            return;
        }

        try {
            $query = "DELETE FROM `note` WHERE id LIKE $id";
            $result = $pdo->prepare($query);
            $result->execute();

            $data['code'] = '1';
            $data['message'] = 'data deleted successfuly';
            echo json_encode($data);
            
        } catch (PDOException $e) {
            echo $e;
        }
    }

    function selectNote($pdo){
        $id = $_GET['id'];
        
        if ($id == '' || $id == null) {
            $data['code'] = '0';
            $data['message'] = 'id can not be null';
            $encoded = json_encode($data);
            echo $encoded;
            return;
        }

        try {
            $query = "SELECT * FROM `note` WHERE id LIKE $id";
            $result = $pdo->prepare($query);
            $result->execute();

            $data['code'] = '1';
            $data['message'] = '';
            $data['data'] = $result->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode($data);
            
        } catch (PDOException $e) {
            echo $e;
        }
    }

    function updateNote($pdo){
        $id = $_GET['id'];
        $insertValue = $_GET['text'];
        
        if ($id == '' || $id == null) {
            $data['code'] = '0';
            $data['message'] = 'id can not be null';
            $encoded = json_encode($data);
            echo $encoded;
            return;
        }

        if ($insertValue == '' || $insertValue == null) {
            $data['code'] = '0';
            $data['message'] = 'text can not be null';
            $encoded = json_encode($data);
            echo $encoded;
            return;
        }

        try {
            $query = "UPDATE `note` SET `text` = :text WHERE `id` = :id";
            $stmt = $pdo->prepare($query);
            $stmt->bindvalue(":text" , $insertValue);
            $stmt->bindvalue(":id" , $id);
            $stmt->execute();

            $data['code'] = '1';
            $data['message'] = '';
            
            echo json_encode($data);
            
        } catch (PDOException $e) {
            echo $e;
        }
    }

    function getNoteList($pdo){
        try {
            $query = "SELECT * FROM `note`";
            $result = $pdo->prepare($query);
            $result->execute();

            $data['code'] = '1';
            $data['message'] = '';
            $data['data'] = $result->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode($data);
            
        } catch (PDOException $e) {
            echo $e;
        }
    }

    function insertNote($pdo){
        $insertValue = $_GET['text'];
        if ($insertValue == null || $insertValue == '') {
            $data['code'] = '0';
            $data['message'] = 'text can not be null';
            $encoded = json_encode($data);
            echo $encoded;
            return;
        }

        try {
            $query = "INSERT INTO `note` (`text`) VALUES ('$insertValue')";
            $pdo->exec($query);

            $data['code'] = '1';
            $data['message'] = 'data added successfully';
            $encoded = json_encode($data);
            echo $encoded;
        } catch (PDOException $e) {
            echo $e;
        }
    }


?>