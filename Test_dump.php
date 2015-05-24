
<?php
// URL du Json mais je ne sais pas comment récup' le code barre scanné pour remplacer celui dans l'url
$code = "3029330003533"; //$_GET[récup depuis le scan];
$json = file_get_contents("http://fr.openfoodfacts.org/api/v0/produit/${code}.json");

var_dump(json_decode($json));

$parsed_json = json_decode($json);
$nom_produit = $parsed_json->{'product'}->{'product_name'};
$code_produit = $parsed_json->{'code'};
$marque = $parsed_json->{'product'}->{'brands'};
$image = $parsed_json->{'product'}->{'image_url'};
?>
</br>
<?php
	echo "\n le produit est ${nom_produit}, de la marque ${marque}, le code barre est ${code_produit}";
?>
</br>
<?php
	echo '<img src="'.$image.'" alt="" />'; 
?>