---
id: events
title: Events
sidebar_label: Events
---

After reading this document, you should be able to understand what events JazzVPN has and how to take advantage of them

## What are events

Events are callbacks you can attach to modify the way JazzVPN reacts. They are triggered on important ocasion, like when a new connection reaches the server, a user tries to logon or peer to peer connection is about to be established. Certain events demand an acceptance or reject based on the data provided. Others allow a richer interaction like user login. 

## Events available

JazzVPN provides up to now the following events:

**Connection acceptance**: This is a first acceptance event. It is triggered when a socket connection reaches JazzVPN server. This is even before TLS handshake takes place, so it's really a first control event to determine werever the connection will be accepted or not. The only parameter received is source ip:port. It is specially usefull when you want to restrict connections for a certain area or ip range or when you want to prevent connections outside certain hours.

**Decryption key or password request**: Kerberos is a login protocol based on the idea that user password is never send over the network, instead of that, user data and a timestamp is send to validate user encrypted with user password. If the password is correct, the server will be able to decrypt the message, otherwise access should be denied. 
To allow the use of an external user database, this callback is provided to receive user login password or hash in order to allow decryption of user data stored in Kerberos message. 

**User validation**: This might be the most important event. It provides a great flexibility in handling user logon, allowing simple multi-factor authentication, leveraged by the use of Python in client and server and even the implementation of Python GUIs on the client. This is a second and more complete instance of connection acceptance. Callback parameters are username, realm, and a list of other_data (code-value items). This event will receive a more exhaustive explanation later on.

**Filter peer list**: JazzVPN allows with this event, modify the peer list reported to the client before the list is send. Callback parameters are username, realm, source ip:port and the list of users and peers visible to the client. Peers are actual devices connected to the network and users are the owner of those connections. It is considered as a possible extension that one user might connect multiple peers or devices, like a printer or a PBX to the network.

**Direct connection approval**: When one user's device starts a connection to any other device in JazzVPN a direct connection will be established. This callback can be used to validate that connection. Callback parameters are origin username and realm, origin device name, origin virtual ip:port, destination device name and destination virtual ip:port.  

## Events programming

Events callback can be a native dll writen in C/C++ or a Python script in a specific location. In this version of JazzVPN Events are taken from a specific location. In the case of Python it is _C:\Users\Public\Documents\Angall\JazzVPN\API\events.py_ and in the case of C/C++ it is _C:\Users\Public\Documents\Angall\JazzVPN\API\jazzvpnevents.dll_.

> Other programming languages could be easily added, using a C/C++ dll as interface between JazzVPN and the specific language, which is the case provided for Python.

JazzVPN comes with a sample C++ callback dll project for Visual Studio which will be installed in user documents folder, along with a Python sample callback module. 

The simplest case is working with Python. This is the base _events.py_ module:

<!--DOCUSAURUS_CODE_TABS-->
<!--Python-->
```py
import jazz

def user_key(user_data):
    jazz.log(jazz.LOG_INFO, "user_key received: "+str(user_data))
    return 'password'

def peer_connection(connection_data):
    jazz.log(jazz.LOG_INFO, "peer_connection received: "+str(connection_data))
    return True

def peer_filter(peer_review):
    jazz.log(jazz.LOG_INFO, "peer_filter received: "+str(peer_review))
    return None

def accept_conn(accept_info):
    jazz.log(jazz.LOG_INFO, "accept_conn received: "+str(accept_info))
    return True

def validate_user(user_data):
    jazz.log(jazz.LOG_INFO, "validate_user received: "+str(user_data))
    return jazz.VALIDATE_USER_STATUS_ACCEPTED
```
<!--END_DOCUSAURUS_CODE_TABS-->

**jazz** is the name given to the module used to interact with JazzVPN internal functions. In this base example, all functions pass over callback processing, except user_key which returns a fixed password for any user. The functions will only be called if the callback processing is enabled in server configuration and the function name exists. You can learn more on how to use the events callbacks in **development**.


When you are implementing a solution, using JazzLogging is a good choice. It will show console errors and log your own results to understand the execution path. JazzLogging captures all outputs going to _stdout_ and _stderr_ but log lines can be added using the special funcion **log** 