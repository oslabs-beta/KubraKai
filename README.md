
<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/oslabs-beta/KubraKai">
    <img src="https://github.com/tony-mtz/KubraKai/blob/images/images/logo.png" alt="Logo" length="300px" width="150px">
  </a>

  <h3 align="center">KubraKai</h3>

  <p align="center">
    An open-source Web App for Kubernetes monitoring.
    <br /><br />
    <a href="https://www.kubrakai.io/"><strong>kubrakai.io</strong></a>
    <br />
    <br />
   
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#demo">Demo</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contributors">Contributors</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

KubraKai is an open-source Web App for Kubernetes monitoring.  KubraKai allows Users to create a profile for storing and tracking numerous Kubernetes Clusters, all within a mobile-first environment!

Key features include:
* User authentication and authorization
* User profile to monitor endpoints
* GraphQL service to abstract PromQL queries for frontend developers
* Graphs that display metrics and can be draged and dropped
* Dynamic date selection for metric data

### Built With

* [Prometheus](https://prometheus.io/)
* [React](https://reactjs.org/)
* [React Router](https://reactrouter.com/)
* [Webpack](https://webpack.js.org/)
* [Jest](https://jestjs.io/)

## Demo

### User Profile

![](../images/images/oauthusercreation.gif?raw=true)


### Track and Monitor Multiple Clusters

![](../images/images/updateip.gif?raw=true)

### Mobile screen demo

![](../images/images/kubrakaimobiledemo.gif?raw=true)


<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites
1.  Crate a [Google OAth](https://developers.google.com/identity/protocols/oauth2) account 
2.  Created a Postgres user database for the tables defined in /model/schema.sql
3.  Expose metrics using Prometheus from a Kubernetes cluster.  You can either expose a live cluster or use [MiniKube](https://minikube.sigs.k8s.io/docs/start/). 

### Setup


### Installing this repo
1. Fork this repo.
2. npm install
3. npm run build
4. Create an .env file to store sensetive data
5. npm run dev

1. Clone the repo
   ```sh
   git clone https://github.com/oslabs-beta/atomos.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create a build directory
   ```sh
   npm run build
   ```
4. Load the unpacked extension from `src/extension/build` to Chrome



<!-- CONTRIBUTORS -->
## Contributors

Anthony Martinez - [GitHub](https://github.com/tony-mtz/) - [LinkedIn](https://www.linkedin.com/in/anthony-martinez-8609683/)

Danny Balistocky - [GitHub](https://github.com/thestinx) - [@LinkedIn](https://www.linkedin.com/in/Danny-Balistocky/)

Jordan King - [GitHub](https://github.com/jordanking7/) - [LinkedIn](https://www.linkedin.com/in/jordan-king7/)

Taylor Davis - [GitHub](https://github.com/themoosky/) - [LinkedIn](https://www.linkedin.com/in/taylor-davis-6b725b1ba/)
