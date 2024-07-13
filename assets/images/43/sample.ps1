$methodRoot = "https://services.odata.org/TripPinRESTierService/People"
0..19 |
    ForEach-Object {
        $URI = $methodRoot + "?`$skip=" + $_ +"&`$top=1"
        $nextlink = "https://it-trials.craigchamberlain.it/assets/images/43/" + ($_ + 1) + ".json"
        (Invoke-WebRequest  $URI |
            Select-Object -ExpandProperty Content) -replace  ']}', ('],"@odata.nextLink":"'+$nextlink+'"}'
        ) > ("assets/images/43/" + $_ + ".json")
    }

$url = "https://it-trials.craigchamberlain.it/assets/images/43/0.json"

while($url){
    $odata = 
        Invoke-WebRequest $url  |
            Where-Object {$_.StatusDescription -eq "OK"} |
            Select-Object -ExpandProperty Content | 
            ConvertFrom-Json
    
    $url = $odata."@odata.nextLink"
    $odata.value
}