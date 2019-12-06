[![Build Status](https://travis-ci.org/jajajaden01/Broadcaster.svg?branch=develop)](https://travis-ci.org/jajajaden01/Broadcaster)
[![Coverage Status](https://coveralls.io/repos/github/jajajaden01/Broadcaster/badge.svg?branch=develop)](https://coveralls.io/github/jajajaden01/Broadcaster?branch=develop)

# Broadcaster App
Broadcaster enables any/every citizen to bring any form of corruption to the notice of appropriate authorities and the general public.

# Features
- User can sign up
- User can sign in
- User can create a red-flag
- User can retrive all his/her red-flag
- User can retrieve a specified red-flag
- User can update a comment of a red-flag
- User can update a location of a red-flag
- User can delete a red-flag
- User can restart his/her red-flag
- Admin can sign in
- Admin can change a status of a red-flag

## Getting Started
To get started with this app you have to follow all instruction below carefully and implement.

## Prerequisites
First all of, Install the softwares on your local machine
- Install `NodeJS` [NodeJs](https://nodejs.org/en/download/)
- Install `Git` [Git](https://git-scm.com/)

## Installing the App
Make sure that you have cloned this Repo to your local machine
- By running `git clone`
- or download the Ziped folder on `GitHub`
- Then after run `cd Broadcaster` to open the folder or simplly double on the downloaded folder
- To install all dependencies locally run this command `npm i` or `npm install` in terminal

### Scripts to use
- run `npm run server` to start server
- run `npm run test` to run tests
- run `npm run dev` to start development
- run `npm run coverage` to run and view test coverages

## API endpoints

**API endpoints with no authentication**
- POST `api/v1/auth/signup` User Sign up.
- POST `api/v1/auth/signin` User Sign in.
- POST `api/v1/admin-panel/signin` Admin Sign in.


- POST `api/v2/auth/signup` User Sign up.
- POST `api/v2/auth/signin` User Sign in.

**API endpoints with no authentication**
- POST `api/v1/red-flags` Create a red-flag
- GET `api/v1/red-flags` View all red-flag
- GET `api/v1/red-flags/:red-flag-id` Get a specific red-flag
- PATCH `api/v1/red-flags/:red-flag-id/comment` Modify a red-flag's comment
- PATCH `api/v1/red-flags/:red-flag-id/location` Modify a red-flag's location
- DELETE `api/v1/red-flags/:red-flag-id` Delete a red-flag
- PATCH `api/v1/red-flags/:red-flag-id/restart` Modify a red-flag's status to draft status
- PATCH `api/v1/admin-panel/:red-flag-id/pending` Modify a red-flag's status to pending status
- PATCH `api/v1/admin-panel/:red-flag-id/status` Modify a red-flag's status to solved or rejected status


- POST `api/v2/red-flags` Create a red-flag
- GET `api/v2/red-flags` View all red-flag
- GET `api/v2/red-flags/:red-flag-id` Get a specific red-flag
- PATCH `api/v2/red-flags/:red-flag-id/comment` Modify a red-flag's comment
- PATCH `api/v2/red-flags/:red-flag-id/location` Modify a red-flag's location
- DELETE `api/v2/red-flags/:red-flag-id` Delete a red-flag
- PATCH `api/v2/red-flags/:red-flag-id/pending` Modify a red-flag's status pending status

## GitHub Pages
- link [Broadcaster web](https://jajajaden01.github.io/Broadcaster/UI/pages/)

### UI pages for a User Panel
- Home page for sign-up or sign-in [link](https://jajajaden01.github.io/Broadcaster/UI/pages/)
- Once the user logs-out, their will back to this page Sign-in [link](https://jajajaden01.github.io/Broadcaster/UI/pages/user-sing-in.html)
- Create an incident [link](https://jajajaden01.github.io/Broadcaster/UI/pages/user-create-incident.html)
- Draft list of Red-flag or Intervention [link](https://jajajaden01.github.io/Broadcaster/UI/pages/user-draft-records-list.html)
- List of Records that are (in-process, reject or all records) for Red-flag or Intervention [link](https://jajajaden01.github.io/Broadcaster/UI/pages/user-all-records-list.html)

### UI pages for an Admin Panel:
- Admin Sign-in [link](https://jajajaden01.github.io/Broadcaster/UI/pages/admin-sing-in.html)
- List of available records to be investigated on, about Red-flag or Intervention [link](https://jajajaden01.github.io/Broadcaster/UI/pages/admin-available-recodrs-list.html)
- List of records in the process, about Red-flag or Intervention [link](https://jajajaden01.github.io/Broadcaster/UI/pages/admin-inprocess-records-list.html)
- List of all records, about Red-flag or Intervention [link](https://jajajaden01.github.io/Broadcaster/UI/pages/admin-all-records-list.html)

## Tools Used

### Back End
* Node JS
* Express (Framework)

### Front End
* HTML
* CSS
* Javascript

## Heroku Deployment
- link [Broadcaster-app](https://broadcasterapp.herokuapp.com/)

## DOCUMENTATION
  link: [API documentation with POSTMAN](https://documenter.getpostman.com/preview/8081802-bccb65ab-4a0a-4d9e-a6c2-6aa80f576641?versionTag=latest&apiName=CURRENT&version=latest&top-bar=ffffff&right-sidebar=303030&highlight=ef5b25)

## Pivot Tracker Stories
[Project Stories](https://www.pivotaltracker.com/n/projects/2411865)

## Author
- SHYAKA Jasmin <jajajaden01@gmail.com>
---

## Copyright
Copyright (c) Jasmin SHYAKA, Software Developer
