# KubraKai
An open-source Web App for Kubernetes monitoring

## Demo

### User Profile

![](../images/images/oauthusercreation.gif?raw=true)


### Track and Monitor Multiple Clusters

![](../images/images/updateip.gif?raw=true)

### Mobile screen demo

![](../images/images/kubrakaimobiledemo.gif?raw=true)

<br>
<br>

## Setup

### prerequisites 
1.  Crate a [Google OAth](https://developers.google.com/identity/protocols/oauth2) account 
2.  Created a Postgres user database for the tables defined in /model/schema.sql
3.  Expose metrics using Prometheus from a Kubernetes cluster.  You can either expose a live cluster or use [MiniKube] (https://minikube.sigs.k8s.io/docs/start/). 

### Installing this repo
1. Fork this repo.
2. npm install
3. npm run build
4. npm run dev