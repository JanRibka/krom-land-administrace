<?php
class File
{
    public static function uploadFile()
    {
        try
        {
            $newFileName = $_POST["fileName"];
            $targetDir = __DIR__ . "/../../upload/" . $newFileName;
    
            move_uploaded_file($_FILES["file"]["tmp_name"], $targetDir);            

            apiResponse(true, "");
        } catch(Exception $ex)
        {
          apiResponse(false, $ex->getMessage());
        }        
    }

    public static function deleteFile()
    {
        try
        {
            $jsonData = file_get_contents('php://input');
            $data = json_decode($jsonData);
            $fileName = $data->fileName;
            $directory = $data->directory;

            // $fileName = $_POST["fileName"];
            // $directory = $_POST["directory"];
            $filePath = __DIR__ . $directory . $fileName;

            unlink($filePath);

            apiResponse(true, "");
        } catch(Exception $ex)
        {
          apiResponse(false, $ex->getMessage());
        }        
    }
}
?>