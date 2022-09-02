# Sample Bank Application :: Turnkey Data Protection and Access Control

## About this sample app
This is a sample app that has been created to mimic some of the very basic functionalities of a banking app and showcase how adding a Thales Data Protection Gateway (DPG) can solve a really complex problem of apply data protection, reveal, and masking based on policies defined at a higher level. The purpose of this application is to take a regular multi tier application and add the DPG sidecar and make sure that the DPG sidecar simply intercepts the API calls and apply data protection and data reveal based on certain polocies applied at the CipherTrust Manager platform.
This application consists of -
* Frontend application written in React JS
* Authentication APIs (SpringBoot application) that take user credentials from frontend and validate/authorize request via CipherTrust Manager API interface, also acquire token that will provide authorization to the logged in user to view a particular dataset as plain text, plain text with some charcaters masked, and finally a completly encrypted form of sensitive information
* Middleware APIs (SpringBoot application) that will cater to the sensitive requests like storing the PCI data encrypyted and revealing data as per policies
* MongoDB container to provide persistence layer
* Last, but not the least, DPG sidecar container

The demo application comes with the utility files such as -
* docker-compose.yml and Dockerfile that would suffice to get the demo environment up and running with just one command
* PowerShell utility script to configure the CipherTrust platform so that it can support the demo

Pre-requisites
* Java 14 to compile the springboot application code
* Docker itself

## Architecture
![image](https://user-images.githubusercontent.com/111074839/188156345-ecc4a1f8-5f19-4b4a-b951-fe7af6ad3b54.png)

### Understanding the Architecture in few bullets
* Frontend application in react will take user credentials and send request to CipherTrust Manager APIs to authorize user and acquire JWT bearer token
* Frontend application to provide interface to account owner to create a new account and retrieve details. All the data will be persisten in the embedded MongoDB container and revealed based on policies. To change the behaviour, no need to change application code, just log in to the CipherTrust Manager platform and make changes there
* DPG sidecar container will be an entry point whereever sensitive data handling is required...e.g. storing PCI data into database or retrieving it

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
