---
title: "Case Study - Deploy docker image to Heroku"
last_modified_at: 2021-07-17T16:20:02-05:00
categories:
  - Blog
tags:
  - Case Study
  - AghTrain
  - Kotlin
  - Docker
  - DevOps
  - Gradle
toc: true
toc_label: "Table of Contents"
toc_icon: "cog"
---

# Case Study - Deploy docker image to Heroku

## Prerequisites
- Heroku account
- Docker image 

## Setup

First we need to instal [heroku-cli](https://devcenter.heroku.com/articles/heroku-cli#download-and-install)

After installing do

```powershell
heroku login

heroku login:container
```

to finalize heroku local setup.

| ![](/assets/images/2021-07-18-12-21-14.png) |
|-|
| **Figure 1. successful login** |

## Create an app
Go to [Heroku apps](https://dashboard.heroku.com/apps)

And click Create new app

| ![](/assets/images/2021-07-18-12-22-50.png) |
|-|
| **Figure 2. Heroku create-new-app button** |

## Push to container

```powershell
# Take care that `web` is a process name, for web app it needs to be set to 'web'
heroku container:push web -a agh-train-be
```

> IMPORTANT
Application needs to use `PORT` env variable, in kotlin app it can be done with 

```kotlin
fun main(args: Array<String>): Unit = io.ktor.server.netty.EngineMain.main(args + "-port=${System.getenv("PORT")}")

```

|![](/assets/images/2021-07-18-12-53-13.png)|
|-|
| **Figure 3. Heroku container push logs**|


## Enable startup method 
Navigate to Heroku app page

|![](/assets/images/2021-07-18-22-27-34.png)|
|-|
| **Figure 4. Heroku app panel** |

Click pencil button, switch toggle, and save.

|![](/assets/images/2021-07-18-22-29-10.png)|
|-|
| **Figure 5. Heroku app panel** |

If everything is ok we should see app up and running after clicking `Open app`

|![](/assets/images/2021-07-18-22-35-53.png)|
|-|
| **Figure 6. Deployed app** |

Tags: 
- Deploy for free
- Free java hosting
- Free docker hosting
- Free kotlin hosting
- Free node hosting