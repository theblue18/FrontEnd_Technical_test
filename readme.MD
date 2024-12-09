 _   _           _   _       _          _____       _ _           _   _           
| | | |         | | (_)     (_)        /  __ \     | | |         | | (_)          
| | | | ___  ___| |_ _  __ _ _ _ __ ___| /  \/ ___ | | | ___  ___| |_ ___   _____ 
| | | |/ _ \/ __| __| |/ _` | | '__/ _ \ |    / _ \| | |/ _ \/ __| __| \ \ / / _ \
\ \_/ /  __/\__ \ |_| | (_| | | | |  __/ \__/\ (_) | | |  __/ (__| |_| |\ V /  __/
 \___/ \___||___/\__|_|\__,_|_|_|  \___|\____/\___/|_|_|\___|\___|\__|_| \_/ \___|
                                                                                  
                                                                                  
 _____         _           _           _   _____         _                        
|_   _|       | |         (_)         | | |_   _|       | |                       
  | | ___  ___| |__  _ __  _  ___ __ _| |   | | ___  ___| |_                      
  | |/ _ \/ __| '_ \| '_ \| |/ __/ _` | |   | |/ _ \/ __| __|                     
  | |  __/ (__| | | | | | | | (_| (_| | |   | |  __/\__ \ |_                      
  \_/\___|\___|_| |_|_| |_|_|\___\__,_|_|   \_/\___||___/\__|                     
                                                                                  
                                                                                  
______               _   _____          _                                         
|  ___|             | | |  ___|        | |                                        
| |_ _ __ ___  _ __ | |_| |__ _ __   __| |                                        
|  _| '__/ _ \| '_ \| __|  __| '_ \ / _` |                                        
| | | | | (_) | | | | |_| |__| | | | (_| |                                        
\_| |_|  \___/|_| |_|\__\____/_| |_|\__,_|                                        
                                                                                  


## Instructions to Run Locally

  

1. Clone the repository.

2. Install dependencies:

`yarn install`

3. Create new .env file and copy content of .env.example to .env.

4. Start the development server:

`yarn dev`

5. Open http://localhost:5173 in your browser to view the application.

6. Click here if you want to test online: https://front-end-technical-test.vercel.app/
  

## I - Development

  
Given the products.json that is on this project which represents a response from a getProducts() API call

Please provide a solution for each questions that follows with the stack/framework/language of your choice

Each question is independent from the others.

  

Comments are appreciated ;-)

  

**For the entire of application, I use:**

**1. Language/Framework:** Reactjs/Typescript (my tech stack)

**2. State Management Framework:** React Hook/Redux/Redux Persist (Good to use because we can handle the complex state)

**3. Build tool:** Vite (fast for small - medium project, reduce the build time)

**4. UI framework:** Ant Design (my tech stack)

  

**Questions:**

**1. User is coming from an Off-White promotion offer link, display only the Off-White's products with a reduced price of 10%.**

Because we just dealing with the display, so I choose solution to display both 	the old price and the promotion price and check directly in the ProductComponent. I use .env file for config: `VITE_PROMOTION_BRAND=Off-White`. We can add more brands to have the promotion. For example: `VITE_PROMOTION_BRAND=Off-White,Supreme`

  
**2. Louis Vuitton doesn't want us to display the name of their brand on our website, could you reverse the name of the brand for each LV product to obfuscate their name ?**

I did the reverse in the reducer (for preventing the checking re-render in the ProductComponent). I use .env file for config: `VITE_REVERSE_BRAND=Louis Vuitton`. We can add more brands to have the reverse. For example: `VITE_REVERSE_BRAND=Louis Vuitton,Supreme`

**3. I'm a user from UK and I want to see product between 1500€ and 500€, ordered from the cheaper to the most expensive that are shippable to my country.**

My solution is using the Filters (Shippable Country Filter and Price Range Filter) and Sort (Sort by Price : low to high) for this question. We can extend the Filter for some countries and the price ranges (not only 1500€ and 500€). Because we have Shippable Country Filter so I create an example API for countries (get Countries API) and call this API in the init state of the App and store countries list data in the reducer.

PS: And because this question is independent from the others, so the Filter function is not working with the promotion price of the question 1. Aso we have the reset filter button.

**4. We want to display how many days/month/year since each products has been deposited on the website (ie: Deposited 1month and 3days ago)**

My solution is using a util function name: calculateDepositTimeSince for every single item in the Product Component. The calculateDepositTimeSince function can work with plural or singular year(s)/month(s)/day(s) and only display with non zero number

  
  

## II - Questions

  

There are no wrong answers, only good opportunities to learn something new.

**1. What metrics are essential in term of Speed ?**
As a Frontend Developer, the following metrics are critical to evaluate and optimize the speed of a website or application:
- First Contentful Paint (FCP): The time it takes for the first piece of content (text, image) to appear on the screen.

- Largest Contentful Paint (LCP): The time taken to load the largest visible content ( hero image, heading) on the page.

- Time to Interactive (TTI): The time when the page becomes fully interactive (e.g., all JavaScript is loaded, and the user can interact with the UI).

- Total Blocking Time (TBT): The time during which the browser is blocked from responding to user input due to JavaScript execution.

- First Input Delay (FID): Measures the time between a user's first interaction and the browser's response.

**2. Can you name ways to increase speed (perceived or actual load time) ?**

- Minify and compress CSS, JavaScript, and HTML using Vite or Webpack for bundling

- Optimize images with modern formats like WebP and implement lazy loading.

- Use code splitting to deliver only the required code for each page.

- Use memoization optimization: React.memo, useMemo, useCallback

- Doing SSR

**3. Could you tell me what are SSR, pre-rendering and Dynamic rendering ?**

- SSR (Server-Side Rendering): HTML is rendered on the server for every request and sent to the client.

- Pre-rendering (Static Site Generation): HTML is generated at build time and served as static files.

- Dynamic Rendering: The server detects if the client is a bot (e.g., search engine) or a user. Bots are served pre-rendered HTML, while users get client-side-rendered content.

**4. You have a bug to fix, you find the file(s) where the bug occurs, the code is a mess, what do you do ?**

- Fix bug first
	- Identify what the code is trying to achieve and why the bug is occurring.
	- Break down the problem into smaller (using console.log).
	- Focus on fixing the bug first without introducing additional issues.
	- Write tests (unit, integration) to confirm the fix works and doesn’t break anything else.

- Then improve the code
	- Use tools like Prettier or ESLint to standardize the style.
	- Refactor the code improve readability and maintainability.
- Then final Test
	- Test manually and write automated tests to ensure the fix covers all edge cases.
	
**5. What represent FrontEnd to you ?**

Frontend development represents the bridge between design and functionality, where we create interactive, accessible, and performant user interfaces. It contains User Experience (UX), Interactivity, Performance, Collaboration, Problem-Solving

**6. What was the last technical challenge you faced and how you did you handle it ?**

The last technical challenge I faced was learning about web3 development and using libraries like web3.js, ethers.js, and thirdweb.js to interact with blockchain technology on the frontend. How I Handled It:

- Studying Documentation: read the official documentation

- Incremental Practice: I started small by building simple features

- Leveraging LLM AI Tools: I utilized AI-powered tools like ChatGPT to assist with example code snippets

**7. What is the next language/framework/stack you want to learn this year and why ?**

I think the next framework that I want to learn in this year is Next.js and Tailwind CSS. With Nextjs, I want to dealing with SSR in Nextjs. I also seen the statistics for the front-end a couple days ago, Tailwind CSS is the most choice of the UI library in this year. So I want to learn it.