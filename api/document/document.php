<?php
require_once __DIR__ . "/../db/db.php";

class Document
{
    public static function uploadDocument()
    {
        try
        {
            $newDocumentName = $_POST["fileName"];
            $targetDir = __DIR__ . "/../../upload/" . $newDocumentName;
    
            move_uploaded_file($_FILES["file"]["tmp_name"], $targetDir);            

            apiResponse(true, "");
        } catch(Exception $ex)
        {
          apiResponse(false, $ex->getMessage());
        }        
    }

    public static function deleteDocument()
    {
        try
        {
            $jsonData = file_get_contents('php://input');
            $data = json_decode($jsonData);
            $id = $data->id;
            $documentName = $data->documentName;
            $directory = $data->directory;            
            $filePath = __DIR__ . $directory . $documentName;

            if (isset($id)) {
                dibi::query("DELETE FROM documentsToDownload as dtd WHERE dtd.Id = %i", $id);                
            }

            if(file_exists($filePath)) {
                unlink($filePath);
            }            

            apiResponse(true, "");
        } catch(Exception $ex)
        {
          apiResponse(false, $ex->getMessage());
        }        
    }

    public static function saveDocument()
    {
        try
        {
            $jsonData = file_get_contents('php://input');
            $data = json_decode($jsonData);
            $id = $data->id;
            $documentName = $data->document->Name;            
            $sourceDocument = __DIR__ . "/../../upload/" . $documentName;
            $targetDocument = __DIR__ . "/../../../publicDocuments/" . $documentName;
            $arr = [
                "Document" => json_encode($data->document),
            ];

            if (isset($id)) {
                dibi::query(
                    'UPDATE documentsToDownload as dtd SET', $arr,         
                    'WHERE dtd.Id = %i',
                    $id
                );
            } else {
                dibi::query(
                    "INSERT INTO documentsToDownload", 
                    $arr
                );

                
            }            

            //TODO: ZIskat ID a vratit ho a pak updatovat ve store
            
            copy($sourceDocument, $targetDocument);    
            if(file_exists($sourceDocument)) {
                unlink($sourceDocument);
            }          

            apiResponse(true, "", );
        } catch(Exception $ex)
        {
          apiResponse(false, $ex->getMessage());
        }    
    } 
}
?>