---
id: policies
title: Policies
sidebar_label: Policies
---

After reading this document, you should be able to use Policies to specify the way users interact.

## What are policies

Policies are templates you can create to define the way JazzVPN should operate regarding users and devices. Policies were created to restrict network visibility for different kind of users. This is useful when you want to restrict your network for certain users: sales and marketing people don't have to see production servers or plant operators should not be able to see admnistrative documents. You can also use policies to define network auditory settings. This is useful if you want to set auditory for special kind of users, like external providers. 

## Defining a new policy

Policies can be of one specific realm or from any. They can be based on exclusion or inclusion. If a policy is bases on exclusion, that means that the specific users or peers will not be visible for the users using that policy. On the other hand, if a policy is based on inclusion, that means that only the specific users or peers will be visible for the users using that policy. 

A policy should be added first, to define it's name and audit mode. Once the policy exists, it can receive users and peers that will be included or excluded by that policy.

## Asigning policies to users

Policies can only be assigned to realms and users group. The former will apply the policy to all users belonging to that realm. The other will only apply the policy to the users beloging to the users group. 

A user can be part of multiple users groups, and have to deal with multiple policies at the same time. The way JazzVPN handles that is by defining a inclusion as a *hard* inclusion, and an exclusion as a *hard* exclusion. In that sense, and inclusion is considered a *soft* exclusion of the users or peers not included. The following examples will consider exclusion policy when it is a _hard_ exclusion.

### If only one policy exists
* If a user is *not* included in the inclusion policy it will not be visible.
* If a user is *not* included in the exclusion policy it will be visible.

### If more than one policy exists
* If a user is included in a policy and is not excluded in a an exclusion policy, it will be visible
* If a user is excluded in a policy and is not included in a an inclusion policy, it will not be visible
* If the case is that the same user is included in an inclusion policy and excluded in another policy, exclusion takes precedence and the user is not visible. 
* If a user is *not* included in an existing inclusion policy and is *not* included in an existing exclusion policy, the user is *soft* excluded and will not be visible.

