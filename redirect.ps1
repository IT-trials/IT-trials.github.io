$newDomain = "it-trials.craigchamberlain.it"
$outputDir = "docs"

function redirectPage($uri) {@"
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Redirecting to https://$newDomain$uri</title>
    <meta http-equiv="refresh" content="0; URL=https://$newDomain$uri">
  </head>
  <link rel="canonical" href="https://$newDomain$uri">
</html>
"@}

$pages = 
    Get-ChildItem ./_site -Recurse -File | 
    ? {$_.Extension -eq ".html"} | 
    % { $_.FullName -replace '.*_site', ""

    }

$dirs = 
    Get-ChildItem ./_site -Recurse -Directory | 
    % { $_.FullName -replace '.*_site', "" }

function Get-Uri ($filename) {
     $filename  -replace "\\","/" `
                -replace "\/index.html","" `
                -replace ".html","" 
}

foreach($dir in $dirs){
    mkdir "$outputDir/$dir"

}

foreach($page in $pages){
    $uri = Get-Uri $page
    redirectPage($uri) | Out-File $outputDir$page

}