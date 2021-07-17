<?php 
    $id = $_GET['id'];
    $data = '';
    
    if ($id != '' || $id != null) {
        $data = getData($id);    
    }

    function getData($id){
        $serverName = "localhost";
        $userName = "root";
        $dbName = "notes";
        $userPassword = "";

        try {
            $pdo = new PDO("mysql:host=$serverName;dbname=$dbName" , $userName , $userPassword);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);    
            $query = "SELECT * FROM `note` WHERE id LIKE $id";
            $result = $pdo->prepare($query);
            $result->execute();
            return $result->fetchAll();

        } catch (PDOException $e) {
            return null;
        }
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,300;0,400;1,400&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://localhost/projects/notes/css/style.css">
    <link rel="stylesheet" href="https://localhost/projects/notes/css/updateStyle.css">
    <title>Document</title>
</head>
<body>
    <div class="container">
        <textarea class="text-area" id="text">
            <?php 
                if ($data != null) {
                    echo $data[0][1];
                }
            ?>
        </textarea>
        <div>
            <?php
                if ($id != '' || $id != null){ ?>
                    <button onClick="updateNote(<?php echo $id;?>)">Update</button>;
                    <?php
                } else { ?>
                    <button onClick="addNote()">Submit</button>;
                    <?php
                }
            ?>
        </div>
    </div>

<script src="https://localhost/projects/notes/js/addUpdateScript.js"></script>
</body>
</html>