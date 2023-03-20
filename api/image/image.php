<?php
require_once __DIR__ . "/../db/db.php";

class Image
{
    public static function uploadImage()
    {
        try
        {
            $newImageName = $_POST["fileName"];
            $targetDir = __DIR__ . "/../../upload/" . $newImageName;
    
            move_uploaded_file($_FILES["file"]["tmp_name"], $targetDir);            

            apiResponse(true, "");
        } catch(Exception $ex)
        {
          apiResponse(false, $ex->getMessage());
        }        
    }

    public static function deleteImage()
    {
        try
        {
            $jsonData = file_get_contents('php://input');
            $data = json_decode($jsonData);
            $imageName = $data->imageName;
            $directory = $data->directory;            
            $filePath = __DIR__ . $directory . $imageName;

            if(file_exists($filePath)) {
                unlink($filePath);
            }            

            apiResponse(true, "");
        } catch(Exception $ex)
        {
          apiResponse(false, $ex->getMessage());
        }        
    }

    public static function saveImageHome()
    {
        try
        {
            $homeId = 1;

            $jsonData = file_get_contents('php://input');
            $data = json_decode($jsonData);
            $imageName = $data->image->Name;
            $name = $data->name;
            $sourceImage = __DIR__ . "/../../upload/" . $imageName;
            $targetImage = __DIR__ . "/../../../publicImg/" . $imageName;
            
            dibi::query(
                'UPDATE home as h SET', [                  
                    $name => json_encode($data->image),
                ],         
                'WHERE h.Id = %i',
                $homeId
            );
            
            copy($sourceImage, $targetImage);    
            if(file_exists($sourceImage)) {
                unlink($sourceImage);
            }          

            apiResponse(true, "");
        } catch(Exception $ex)
        {
          apiResponse(false, $ex->getMessage());
        }    
    }

    public static function saveImageTeamMember()
    {
        try
        {
            $jsonData = file_get_contents('php://input');
            $data = json_decode($jsonData);
            $id = $data->id;
            $imageName = $data->image->Name;            
            $sourceImage = __DIR__ . "/../../upload/" . $imageName;
            $targetImage = __DIR__ . "/../../../publicImg/" . $imageName;
            
            dibi::query(
                'UPDATE teamMembers as tm SET', [                  
                    "Image" => json_encode($data->image),
                ],         
                'WHERE tm.Id = %i',
                $id
            );
            
            copy($sourceImage, $targetImage);    
            if(file_exists($sourceImage)) {
                unlink($sourceImage);
            }          

            apiResponse(true, "");
        } catch(Exception $ex)
        {
          apiResponse(false, $ex->getMessage());
        }    
    }
}
?>