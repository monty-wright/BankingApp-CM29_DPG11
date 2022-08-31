$username = "admin"
$password = "Entrust@2018"
$kms = "20.127.6.212"
$counter = "dpg-aj-6"

#Some house keeping stuff
add-type @"
    using System.Net;
    using System.Security.Cryptography.X509Certificates;
    public class TrustAllCertsPolicy : ICertificatePolicy {
        public bool CheckValidationResult(
            ServicePoint srvPoint, X509Certificate certificate,
            WebRequest request, int certificateProblem) {
            return true;
        }
    }
"@
[System.Net.ServicePointManager]::CertificatePolicy = New-Object TrustAllCertsPolicy

Write-Output "-----------------------------------------------------------------"
Write-Output "Next few steps will create boilerplate config on your CM instance"
Write-Output "-----------------------------------------------------------------"

#Invoke API for token generation
Write-Output "Getting token from Thales CipherTrust Manager..."
$Url = "https://$kms/api/v1/auth/tokens"
$Body = @{
    grant_type = "password"
    username = $username
    password = $password
}
$response = Invoke-RestMethod -Method 'Post' -Uri $Url -Body $body
$jwt = $response.jwt

#Generic header for next set of API calls
$headers = @{
    
    Authorization="Bearer $jwt"
}

#Creating Character Set
Write-Output "Creating Character Set..."

$url = "https://$kms/api/v1/data-protection/character-sets"
$body = @{
    'name' = "DPGAlphaNum-$counter"
    'range' = @('0030-0039', '0041-005A', '0061-007A')
    'encoding' = 'UTF-8'
}
$jsonBody = $body | ConvertTo-Json -Depth 5
$response = Invoke-RestMethod -Method 'Post' -Uri $url -Body $jsonBody -Headers $headers -ContentType 'application/json'
$charSetId = $response.id

#Creating CVV Protection Policy
Write-Output "Creating Protection Policy for CVV Number..."
$url = "https://$kms/api/v1/data-protection/protection-policies"
$body = @{
    'name' = "cvv_ProtectionPolicy-$counter"
    'key' = 'dpgKey'
    'tweak' = '1628462495815733'
    'tweak_algorithm' = 'SHA1'
    'algorithm' = 'FPE/FF1v2/UNICODE'
    'character_set_id' = $charSetId
    'allow_single_char_input' = $false
}
$jsonBody = $body | ConvertTo-Json -Depth 5
$response = Invoke-RestMethod -Method 'Post' -Uri $url -Body $jsonBody -Headers $headers -ContentType 'application/json'
$cvvPolicyId = $response.id

#Creating CC Number Protection Policy
Write-Output "Creating Protection Policy for Credit Card Number..."
$url = "https://$kms/api/v1/data-protection/protection-policies"
$body = @{
    'name' = "CC_ProtectionPolicy-$counter"
    'key' = 'dpgKey'
    'tweak' = '9828462495846783'
    'tweak_algorithm' = 'SHA1'
    'algorithm' = 'FPE/AES/CARD10'
    'allow_single_char_input' = $false
}
$jsonBody = $body | ConvertTo-Json -Depth 5
$response = Invoke-RestMethod -Method 'Post' -Uri $url -Body $jsonBody -Headers $headers -ContentType 'application/json'
$ccPolicyId = $response.id

#Creating SSN Protection Policy
Write-Output "Creating Protection Policy for SSN..."
$url = "https://$kms/api/v1/data-protection/protection-policies"
$body = @{
    'name' = "SSN_ProtectionPolicy-$counter"
    'key' = 'dpgKey'
    'tweak' = '1628462495815733'
    'tweak_algorithm' = 'SHA1'
    'algorithm' = 'FPE/FF1v2/UNICODE'
    'character_set_id' = $charSetId
    'allow_single_char_input' = $false
}
$jsonBody = $body | ConvertTo-Json -Depth 5
$response = Invoke-RestMethod -Method 'Post' -Uri $url -Body $jsonBody -Headers $headers -ContentType 'application/json'
$ssnPolicyId = $response.id

#Creating User Sets
Write-Output "Creating PlainText User Set..."
$url = "https://$kms/api/v1/data-protection/user-sets"
$body = @{
    'name' = "plainttextuserset-$counter"
    'description' = "plain text user set for card account owner"
    'users' = @('ccaccountowner')
}
$jsonBody = $body | ConvertTo-Json -Depth 5
$response = Invoke-RestMethod -Method 'Post' -Uri $url -Body $jsonBody -Headers $headers -ContentType 'application/json'
$plainTextUserSetId = $response.id

Write-Output "Creating Masked Data User Set..."
$url = "https://$kms/api/v1/data-protection/user-sets"
$body = @{
    'name' = "maskedtextuserset-$counter"
    'description' = "masked text user set for CS exec"
    'users' = @('cccustomersupport')
}
$jsonBody = $body | ConvertTo-Json -Depth 5
$response = Invoke-RestMethod -Method 'Post' -Uri $url -Body $jsonBody -Headers $headers -ContentType 'application/json'
$maskedTextUserSetId = $response.id

Write-Output "Creating Encrypted Data User Set..."
$url = "https://$kms/api/v1/data-protection/user-sets"
$body = @{
    'name' = "enctextuserset-$counter"
    'description' = "encrypted text user set for everyone else"
    'users' = @('generaluserset')
}
$jsonBody = $body | ConvertTo-Json -Depth 5
$response = Invoke-RestMethod -Method 'Post' -Uri $url -Body $jsonBody -Headers $headers -ContentType 'application/json'
$encTextUserSetId = $response.id

#Creating masking policy
Write-Output "Creating masking policy for CC..."
$url = "https://$kms/api/v1/data-protection/masking-formats"
$body = @{
    'name' = "cc_masking_format-$counter"
    'starting_characters' = 0
    'ending_characters' = 4
    'show' = $true
    'mask_char' = 'x'
}
$jsonBody = $body | ConvertTo-Json -Depth 5
$response = Invoke-RestMethod -Method 'Post' -Uri $url -Body $jsonBody -Headers $headers -ContentType 'application/json'
$maskingPolicyId = $response.id

#Creating Access Policies
Write-Output "Creating Access Policy for Credit Card use case..."
$url = "https://$kms/api/v1/data-protection/access-policies"
$body = @{
    'name' = "cc_access_policy-$counter"
    'description' = "CC Access Policy for credit card user set"
    'default_reveal_type' = 'Error Replacement Value'
    'default_error_replacement_value' = '000000'
    'user_set_policy' = @(
        @{
            'user_set_id' = $plainTextUserSetId
            'reveal_type' = 'Plaintext'
        },
        @{
            'user_set_id' = $maskedTextUserSetId
            'reveal_type' = 'Masked Value'
            'masking_format_id' = $maskingPolicyId
        },
        @{
            'user_set_id' = $encTextUserSetId
            'reveal_type' = 'Ciphertext'
        }
    )
}
$jsonBody = $body | ConvertTo-Json -Depth 5
$response = Invoke-RestMethod -Method 'Post' -Uri $url -Body $jsonBody -Headers $headers -ContentType 'application/json'
$accessPolicyId = $response.id

#This is the interesting step...defining DPG policies for the API endpoints
Write-Output "Creating DPG Policy for CC use case..."
$url = "https://$kms/api/v1/data-protection/dpg-policies"
$body = @{
    'name' = "cc_policy-$counter"
    'description' = 'DPG policy for credit card attributes'
    'proxy_config' = @(
        @{
            'api_url' = '/api/fakebank/account'
            'json_request_post_tokens' = @(
                @{
                    'name' = 'ccNumber'
                    'operation' = 'protect'
                    'protection_policy' = "CC_ProtectionPolicy-$counter"
                },
                @{
                    'name' = 'cvv'
                    'operation' = 'protect'
                    'protection_policy' = "cvv_ProtectionPolicy-$counter"
                },
                @{
                    'name' = 'ssn'
                    'operation' = 'protect'
                    'protection_policy' = "SSN_ProtectionPolicy-$counter"
                }
            )
            'json_response_get_tokens' = @(
                @{
                    'name' = 'cvv'
                    'operation' = 'reveal'
                    'protection_policy' = "cvv_ProtectionPolicy-$counter"
                    'access_policy' = "cc_access_policy-$counter"
                },@{
                    'name' = 'ccNumber'
                    'operation' = 'reveal'
                    'protection_policy' = "cvv_ProtectionPolicy-$counter"
                    'access_policy' = "cc_access_policy-$counter"
                },@{
                    'name' = 'ssn'
                    'operation' = 'reveal'
                    'protection_policy' = "cvv_ProtectionPolicy-$counter"
                    'access_policy' = "cc_access_policy-$counter"
                }
            )
        }
    )
}
$jsonBody = $body | ConvertTo-Json -Depth 5
$response = Invoke-RestMethod -Method 'Post' -Uri $url -Body $jsonBody -Headers $headers -ContentType 'application/json'
$dpgPolicyId = $response.id

#Creating local CA
Write-Output "Creating local CA..."
$url = "https://$kms/api/v1/ca/local-cas"
$body = @{
    'name' = "local-CA-$counter"
    'algorithm' = 'RSA'
    'size' = 2048
    'cn' = 'kylo.com'
    'dnsNames' = @('*.thalesgroup.com', '*.thalesgroup.net')
    'emailAddresses' = @('contact@thalesgroup.com')
    'ipAddresses' = @('1.1.1.1')
    'names' = @(
        @{
            'O' = 'Thales'
            'OU' = 'RnD'
            'C' = 'US'
            'ST' = 'MD'
            'L' = 'Belcamp'
        }
    )
}
$jsonBody = $body | ConvertTo-Json -Depth 5
$response = Invoke-RestMethod -Method 'Post' -Uri $url -Body $jsonBody -Headers $headers -ContentType 'application/json'
$caId = $response.id

#Final setup...creating client application
Write-Output "Creating client profile..."
$url = "https://$kms/api/v1/data-protection/client-profiles"
$body = @{
    'name' = "CC_profile-$counter"
    'nae_iface_port' = 9005
    'app_connector_type' = 'DPG'
    'policy_id' = $dpgPolicyId
    'lifetime' = '30d'
    'cert_duration' = 730
    'max_clients' = 200
    'ca_id' = $caId
    'csr_parameters' = @{
        'csr_cn' = 'admin'
        'csr_country' = ''
        'csr_state' = ''
        'csr_city' = ''
        'csr_org_name' = ''
        'csr_org_unit' = ''
        'csr_email' = ''
    }
    'configurations' = @{
        'verify_ssl_certificate' = $false
        'use_persistent_connections' = $true
        'log_level' = 'DEBUG'
        'tls_to_appserver' = @{
            'tls_skip_verify' = $true
            'tls_enabled' = $false
        }
        'auth_method_used' = @{
            'scheme_name' = 'Basic'
        }
    }
}
$jsonBody = $body | ConvertTo-Json -Depth 5
$response = Invoke-RestMethod -Method 'Post' -Uri $url -Body $jsonBody -Headers $headers -ContentType 'application/json'
$appId = $response.id
$appId.reg_token