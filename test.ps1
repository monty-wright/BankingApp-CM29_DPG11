###
#Demo Script
###

Install-Module -Name powershell-yaml -Force -Repository PSGallery
Import-Module CipherTrustManager -Force -ErrorAction Stop

$DebugPreference = 'SilentlyContinue'
#$DebugPreference = 'Continue'


$username = "admin"
$password = "P4ssw0rd!"
$kms = "192.168.136.130"
$nae_port = 9005
$counter = "demo1"
$keyname = "dpgKey-$counter"
#$usageMask = 3145740
$usageMask = ([UsageMaskTable]::Encrypt + [UsageMaskTable]::Decrypt + [UsageMaskTable]::FPEEncrypt + [UsageMaskTable]::FPEDecrypt) #More HUMAN READABLE ;)
$algorithm = 'aes'
$size = 256

Write-Output "-----------------------------------------------------------------"
Write-Output "Next few steps will create boilerplate config on your CM instance"
Write-Output "-----------------------------------------------------------------"

#Initialize and authenticate a connection with CipherTrust Manager
Connect-CipherTrustManager `
    -server $kms `
    -user $username `
    -pass $password

#Create a key
Write-Output "Creating a Key"
$keySuccess = New-CMKey  `
    -keyname $keyname `
    -usageMask $usageMask `
    -algorithm $algorithm `
    -size $size
if (-NOT $keySuccess) {
    Write-Output "Key already created"
}
Write-Output "...Done"

#Get local root CA ID
$caID = Find-CMCAs `
    -subject "/C=US/ST=TX/L=Austin/O=Thales/CN=CipherTrust Root CA"
#if (-NOT $caID){
#    Write-Error "Unable to find CA" -ErrorAction Stop
#}

#Create an NAE network interface
Write-Output "Creating an NAE network interface"
$interfaceSuccess = New-CMInterface `
    -port $nae_port `
    -cert_user_field CN -mode 'tls-cert-pw-opt' `
    -auto_gen_ca_id $caId `
    -trusted_cas_local $caId `
    -network_interface 'all'
if (-NOT $interfaceSuccess) {
    Write-Output "NAE Interface already created"
}
Write-Output "...Done"

#Creating Character Set
Write-Output "Creating Character Set..."
$charSetId = New-CMCharacterSet `
    -name "DPGAlphaNum-$counter" `
    -range @('0030-0039', '0041-005A', '0061-007A') `
    -encoding 'UTF-8'
#if already exists... go get the id
if (-NOT $charSetId) {
    $charsetList = Find-CMCharacterSets `
        -name "DPGAlphaNum-$counter"
    $charSetId = $charsetList.resources[0].id
}
Write-Output "...Done"

### Creating Protection Policies
Write-Output "Creating Protection Policies...."
#Creating CVV Protection Policy
Write-Output "---Creating Protection Policy for CVV Number..."
$null = New-CMProtectionPolicy `
    -name "cvv_ProtectionPolicy-$counter" `
    -key "dpgKey-$counter" `
    -tweak '1628462495815733' `
    -tweak_algorithm 'SHA1' `
    -algorithm 'FPE/FF1v2/UNICODE' `
    -character_set_id $charSetId 
Write-Output "---Done"

#Creating CC Number Protection Policy
Write-Output "---Creating Protection Policy for Credit Card Number..."
$null = New-CMProtectionPolicy `
    -name "CC_ProtectionPolicy-$counter" `
    -key "dpgKey-$counter" `
    -tweak '9828462495846783' `
    -tweak_algorithm 'SHA1' `
    -algorithm 'FPE/AES/CARD10'
Write-Output "---Done"

#Creating SSN Protection Policy
Write-Output "---Creating Protection Policy for SSN..."
$null = New-CMProtectionPolicy `
    -name "SSN_ProtectionPolicy-$counter" `
    -key "dpgKey-$counter" `
    -tweak '1628462495815733' `
    -tweak_algorithm 'SHA1' `
    -algorithm 'FPE/FF1v2/UNICODE' `
    -character_set_id $charSetId
Write-Output "---Done"
###Done Creating Protection Policies
Write-Output "...Done"

#Creating User Sets
Write-Output "Creating PlainText User Set..."
$plainTextUserSetId = New-CMUserSet `
    -name "plainttextuserset-$counter" `
    -description "plain text user set for card account owner" `
    -users @('ccaccountowner')
#if already exists... go get the id
if (-NOT $plainTextUserSetId) {
    $userList = Find-CMUserSets  `
        -name "plainttextuserset-$counter"
    $plainTextUserSetId = $userList.resources[0].id
}
Write-Output "...Done"

Write-Output "Creating Masked Data User Set..."
$maskedTextUserSetId = New-CMUserSet `
    -name "maskedtextuserset-$counter" `
    -description "masked text user set for CS exec" `
    -users @('cccustomersupport')
#if already exists... go get the id
if (-NOT $maskedTextUserSetId) {
    $userList = Find-CMUserSets  `
        -name "maskedtextuserset-$counter"
    $maskedTextUserSetId = $userList.resources[0].id
}
Write-Output "...Done"

Write-Output "Creating Encrypted Data User Set..."
$encTextUserSetId = New-CMUserSet `
    -name "enctextuserset-$counter" `
    -description "encrypted text user set for everyone else" `
    -users @('everyoneelse')
#if already exists... go get the id
if (-NOT $encTextUserSetId) {
    $userList = Find-CMUserSets  `
        -name "enctextuserset-$counter"
    $encTextUserSetId = $userList.resources[0].id
}
Write-Output "...Done"
#Done Creating User Sets

#Creating Masking Policies
Write-Output "Creating masking policy for CC..."
$maskingPolicyId = New-CMMaskingFormat `
    -name "cc_masking_format-$counter" `
    -starting_characters 0 `
    -ending_characters 4 `
    -mask_char 'x' `
    -Show
#if already exists... go get the id
if (-NOT $maskingPolicyId) {
    $MaskingFormatList = Find-CMMaskingFormats `
        -name "cc_policy-$counter"
    $maskingPolicyId = $MaskingFormatList.resources[0].id
}
Write-Output "...Done"
#Done Creating Masking Policies

###Creating Access Policies
Write-Output "Creating Access Policies for Credit Card use case..."

Write-Output "---Creating User Set for Plaintext"
#Creating User Set Policies
$user_set_policies = @()
$user_set_policies = New-CMUserSetPolicy `
    -user_set_policy $user_set_policies `
    -user_set_id $plainTextUserSetId `
    -reveal_type Plaintext
#Write-HashtableArray $user_set_policies
Write-Output "---Done"

Write-Output "---Creating User Set for Masked"
$user_set_policies = New-CMUserSetPolicy `
    -user_set_policy $user_set_policies `
    -user_set_id $maskedTextUserSetId `
    -reveal_type MaskedValue `
    -masking_format_id $maskingPolicyId
#Write-HashtableArray $user_set_policies
Write-Output "---Done"
    
Write-Output "---Creating User Set for Ciphertext"
$user_set_policies = New-CMUserSetPolicy `
    -user_set_policy $user_set_policies `
    -user_set_id $encTextUserSetId `
    -reveal_type Ciphertext
#Write-HashtableArray $user_set_policies
Write-Output "---Done"
    
#Creating Access Policies
Write-Output "---Creating Access Policies"
#$accessPolicyId = 
$null = New-CMAccessPolicy `
    -name "cc_access_policy-$counter" `
    -description "CC Access Policy for credit card user set" `
    -default_reveal_type ErrorReplacement `
    -default_error_replacement_value '000000' `
    -user_set_policy $user_set_policies
Write-Output "---Done"
###Done Creating Access Policies
Write-Output "...Done"
###Done Creating Access Policies

###Creating DPG Policy
#This is the interesting step...defining DPG policies for the API endpoints
Write-Output "Creating DPG Policy for CC use case..."
#Post Endpoint
Write-Output "---Creating POST REQUEST Endpoint configuration..."
$json_request_post_tokens = @()
$json_request_post_tokens = New-CMDPGJSONRequestResponse `
    -name 'ccNumber' `
    -operation Protect `
    -protection_policy "CC_ProtectionPolicy-$counter"
$json_request_post_tokens = New-CMDPGJSONRequestResponse `
    -json_tokens $json_request_post_tokens `
    -name 'cvv' `
    -operation Protect `
    -protection_policy "cvv_ProtectionPolicy-$counter"
$json_request_post_tokens = New-CMDPGJSONRequestResponse `
    -json_tokens $json_request_post_tokens `
    -name 'ssn' `
    -operation Protect `
    -protection_policy "SSN_ProtectionPolicy-$counter"
$json_request_post_tokens = New-CMDPGJSONRequestResponse `
    -json_tokens $json_request_post_tokens `
    -name 'dob' `
    -operation Protect `
    -protection_policy "SSN_ProtectionPolicy-$counter"
Write-Output "---Done"

#Get Endpoint
Write-Output "---Creating GET RESPONSE Endpoint configuration..."
$json_response_get_tokens = @()
$json_response_get_tokens = New-CMDPGJSONRequestResponse `
    -name 'accounts.[*].ccv' `
    -operation Reveal `
    -protection_policy "cvv_ProtectionPolicy-$counter" `
    -access_policy "cc_access_policy-$counter"
$json_response_get_tokens = New-CMDPGJSONRequestResponse `
    -json_tokens $json_response_get_tokens `
    -name 'accounts.[*].ccNumber' `
    -operation Reveal `
    -protection_policy "CC_ProtectionPolicy-$counter" `
    -access_policy "cc_access_policy-$counter"
$json_response_get_tokens = New-CMDPGJSONRequestResponse `
    -json_tokens $json_response_get_tokens `
    -name 'ssn' `
    -operation Reveal `
    -protection_policy "SSN_ProtectionPolicy-$counter" `
    -access_policy "cc_access_policy-$counter"
$json_response_get_tokens = New-CMDPGJSONRequestResponse `
    -json_tokens $json_response_get_tokens `
    -name 'dob' `
    -operation Reveal `
    -protection_policy "SSN_ProtectionPolicy-$counter" `
    -access_policy "cc_access_policy-$counter"
Write-Output "---Done"

#Set Proxy Config
Write-Output "---Creating Proxy Config for POST REQUEST..."
#$proxy_config = @()
$proxy_config = New-CMDPGProxyConfig `
    -api_url '/api/fakebank/account' `
    -json_request_post_tokens $json_request_post_tokens
#Write-HashtableArray $proxy_config -DEBUG
Write-Output "---Done"

Write-Output "---Creating Proxy Config for GET RESPONSE..."
$proxy_config = New-CMDPGProxyConfig `
    -proxy_config $proxy_config `
    -api_url '/api/fakebank/accounts/{id}' `
    -json_response_get_tokens $json_response_get_tokens
#Write-HashtableArray $proxy_config -DEBUG
Write-Output "---Done"

#Create DPG Policy
Write-Output "---Creating DPG Policy..."
$dpgPolicyId = New-CMDPGPolicy `
    -name "cc_policy-$counter"  `
    -description 'DPG policy for credit card attributes' `
    -proxy_config $proxy_config
###Done Creating DPG Policy
Write-Output "---Done"

Write-Output "...Done"

###Creating Application Profile
#Final setup...creating client application
Write-Output "Creating client profile..."
$regToken = New-CMClientProfiles `
    -name "CC_profile-$counter" `
    -nae_iface_port  $nae_port `
    -app_connector_type DPG `
    -policy_id $dpgPolicyId `
    -lifetime '30d' `
    -cert_duration 730 `
    -max_clients 200 `
    -ca_id $caId `
    -csr_cn 'admin' `
    -UsePersistentConnections `
    -log_level DEBUG `
    -TLS_SkipVerify `
    -TLS_Enabled `
    -auth_method_scheme_name 'Basic'
###Done Creating Application Profile
Write-Output "...Done"

###Creating Users
#ohhh...this one is the final step...adding few users
Write-Output "Creating sample users..."
#ccaccountowner, cccustomersupport, everyoneelse --- password is same for all...KeySecure01!

Write-Output "---Creating Account Owner..."
$pssword = ConvertTo-SecureString 'KeySecure01!' -AsPlainText
$Cred = New-Object System.Management.Automation.PSCredential ("ccaccountowner", $pssword)
New-CMUser `
    -email 'ccaccountowner@local' `
    -name 'ccaccountowner' `
    -ps_creds  $Cred `
    -app_metadata @{} `
    -user_metadata @{}
Write-Output "---Done"

Write-Output "---Creating Customer Support..."
$pssword = ConvertTo-SecureString 'KeySecure01!' -AsPlainText
New-CMUser `
    -email 'cccustomersupport@local' `
    -name 'cccustomersupport' `
    -username 'cccustomersupport' `
    -secure_password  $pssword `
    -app_metadata @{} `
    -user_metadata @{}
Write-Output "---Done"

Write-Output "---Creating 'Everyone Else'..."
New-CMUser `
    -email 'everyoneelse@local' `
    -name 'everyoneelse' `
    -username 'everyoneelse' `
    -password 'KeySecure01!' `
    -app_metadata @{} `
    -user_metadata @{}
Write-Output "---Done"

###Done Creating Users
Write-Output "...Done"


###Create Docker setup
Write-Output "Creating Docker Setup from Template..."
[string[]]$fileContent = Get-Content ".\docker-compose-template.yml"
$content = ''
foreach ($line in $fileContent) { $content = $content + "`n" + $line }
$yamlObj = ConvertFrom-YAML $content
$yamlObj.services.ciphertrust.environment = @(
    "REG_TOKEN=$regToken",
    "DESTINATION_URL=http://api:8080",
    "TLS_ENABLED=false",
    "KMS=$kms",
    "DPG_PORT=$nae_port"
)
$yamlObj.services.api.environment = @(
    "CMIP=https://$kms"
)

$yaml = ConvertTo-YAML $yamlObj | .\yq.exe
Set-Content -Path ".\docker-compose.yml" -Value $yaml
Write-Output "...Done"

Write-Output "`n"
Write-Output ">>>>> Completed Configuring your CipherTrust Manager Instance <<<<<"
Write-Output " __________________________________________________________________________"
Write-Output "| Replaced below variables in the docker-compose.yml file in current folder |"
Write-Output "| REG_TOKEN: $regToken"
Write-Output "| KMS: $kms"
Write-Output "| CMIP: https://=$kms"
Write-Output "|__________________________________________________________________________|"

Write-Output "Running demo application now..."
#docker compose up