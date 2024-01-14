<?php
function uploadFile($nameFolder, $file){
    $fileName = time().''.$file;
    return $file->storeAS($nameFolder, $fileName,'public');
}