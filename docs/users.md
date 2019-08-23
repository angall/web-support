---
id: users
title: Users
sidebar_label: Users
---

After reading this document, you should be able to create and configure users

## User creation

In users list you will be able to see all users created for the selected realm. If you change active realm list content will switch to the users of the new realm. Users cannot be shared between realm. Each realm is a separate network and there is no way to mix users from one network into the other. In the future there might be options to connect different realms in order to share resources in distributed VPN servers, but this is not possible yet. 

![add-user](assets/add_user.png)

The regular case to add a user is by clicking Add User and entering username and password. The normal case is that user will have to change password on first logon. Of course realm should be defined for user, with current active realm as default. Account can have a fixed expiration date, which is useful for a temporal worker and password relative expiration is also an option for prefixed amount of time. 

Once user has been created, you can modify user data and password using Modify button. Delete of users is an option that should be carefuly used, because the user is actually deleted along with all historic data recorded related to that user. 