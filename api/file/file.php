<?php
class File
{
    public static function uploadFile()
    {
        try
        {
            $targetDir = "upload/";
            $file = $_FILES["file"]["name"];
            $path = pathinfo($file);            
            $fileName = $path['filename'];
            $ext = $path['extension'];
            $tempName = $_FILES['file']['tmp_name'];
            $pathFilenameExt = $targetDir.$fileName.".".$ext;
            $random_name = rand(1000,1000000)."-".$file;
            $upload_name = $targetDir.strtolower($random_name);
            $upload_name = preg_replace('/\s+/', '-', $upload_name);

            // move_uploaded_file($tempName,$upload_name);
            // // $file = $_FILES["file"];
            // $newFileName = $_POST["fileName"];            

            // // Move file to directory            
            // move_uploaded_file($fileName, $fileName);

            

            apiResponse(true, "", $file . " " . $upload_name);
        } catch(Exception $ex)
        {
          apiResponse(false, $ex->getMessage());
        }        
    }

}
?>