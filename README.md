# Sample Bank Application :: Turnkey Data Protection and Access Control

## About this sample app
This is a sample app that has been created to mimic some of the very basic functionalities of a banking app and showcase how adding a Thales Data Protection Gateway (DPG) can solve a really complex problem of apply data protection, reveal, and masking based on policies defined at a higher level.

## Architecture
![image](https://user-images.githubusercontent.com/111074839/188156345-ecc4a1f8-5f19-4b4a-b951-fe7af6ad3b54.png)

### Understanding the Architecture in few bullets
* The purpose of running DPG container as the sidecar is to allow you to write you application as if nothing has really changed. You can continue invoking your business layer APIs via DPG endpoint and security will come as a bonus without any effort.
* The APIs responsible for handling sensitive data that you want to protect or reveal in a secure way have to be via DPG container endpoint.

## Deployment Script - PowerShell
The helper script provided along with the project would help you in setting up some boilerplate configuration that will allow you to run the demo out of the box.
The helper script can be modified to suit your needs very easily with very little to no knowledge of PowerShell need, simply replace the values of some of the variables and the script will yake care of rest. Some of the more relevant parameters and what they mean are below -

Parameter | Description
--- | ---
username | CM username with admin privileges
password | CM password corresponding to the above user
kms | CM IP for your ciphertrust manager instance
counter | suffix for the various assets that would be created to easily differentiate between those assets

## Updating docker compose file
This sample application is a typical multi tier microservices based application that involves a react frontend, SpringBoot API Proxy and the actual SpringBoot service that does database handling. Along with the three application containers, this sample project also leverages the sidecar container of CipherTrust DPG and a MongoDB container.
Docker compose file has been provided along with the project so that you can try the whole feature set by running a single command i.e. **docker compose up** 

After running the deployment script you should recieve the registration token for DPG application that has been created on the CipherTrust platform.
You can update below parameters and the docker compose is ready to go.

Parameter | Description
--- | ---
services.ciphertrust.environment.REG_TOKEN | Registration Token returned by the deployment script
services.ciphertrust.environment.KMS | Ciphertrust Manager (CM) IP address
services.api.environment.CMIP | Ciphertrust Manager (CM) IP address
