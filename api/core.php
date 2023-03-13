<?php
function JSON($arr = [])
{
  return @json_encode($arr, 128);
}

function apiResponse(bool $success, string $msg, $data = null)
{
  echo JSON([
    "Success" => $success,
    "ErrMsg" => $msg,
    "Data" => $data,
  ]);
}

function camelcase(string $str, string $delimeter = "_")
{
  return str_replace($delimeter, "", ucwords($str, $delimeter));
}
?>
