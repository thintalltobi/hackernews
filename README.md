<a name="readme-top"></a>
<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Hackernews API integration </h3>

  <p align="center">
    An awesome README template to jumpstart your projects!
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template">View Demo</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues">Report Bug</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
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
    <li><a href="#usage">Usage</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

Take home assessment that retrieves data from hackernews API and process it at intervals. The project consist of a queue that periodically queries the hackernews API and a list of endpoints to access related data

Below are the high level implementations:
* Worked on a queue that retrieves data from the hackernews API, process and store into related database tables. The operation is configured to run every 12 hours 
* Exposed Stories endpoint to fetch and retrieve data
* Exposed Comment endpoint to fetch and retrieve data
* Exposed Author's endpoint to fetch and retrieve data

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

* [![Nest][Nest.js]][Next-url]
* [![MySQL][MySQL]][Mysql-url]
* [![Redis][Redis]][Redis-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started


### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Clone the repo
   ```sh
   git clone  https://github.com/thintalltobi/hackernews.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create DB, Run database Migration and update the ormconfig file in the db folder
   ```sh
   You need to create the database 'hacker-news' 

   npm run migration:generate ./src/db/migrations/nameofmigration
   npm run typeorm migration:run  

   ```
4. Ensure redis server is up and running
   ```sh
   https://redis.io/docs/get-started/

   use redis-server to start the redis server
   ```
5. Copy env example file and set params

    cp .env.example .env

6. Start the app
   ```js
   npm run start
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Swagger URL 

To see the swagger documentation please click here [Swagger API](http://localhost:3000/api)_

The POSTMAN collection can be found at the root of the project folder

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>




<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[Mysql-url]: https://www.mysql.com/
[Redis-url]: https://redis.io/docs/get-started/