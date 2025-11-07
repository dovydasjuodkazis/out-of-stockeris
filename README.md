# Essential Apps Dev Task

### Tech Thingies
- Shopify CLI
- React Router v7 framewok
- React + Polaris web components for UI (not the polaris-react, it's deprecated)
- TypeScript for having type safety

### How to run
1. Go to app directory `cd /out-of-stockeris`
2. run `npm install` to install dependencies
3. run `shopify app dev` to start a development server

### How was the task
Initiated the scaffold app using `shopify app init` command, connected my Shopify Partner Account, 
created a test dev store with generated products. No additional libraries installed to do the task 
(all there was within the scaffold). Removed some template files (not all of them, this might need a 
proper cleanup before use). Tried out Shopify Graphql to see how to query products and its details. 
Later transferred the query to api.products.tsx which acts as the endpoint to get inventory stock. Spent
some time playing around w/ Polaris web components, seeing on how the properties work, different tables,
etc. Finally to make everything more modular and scalable separated utils, queries, types and constants 
into separate directories. React state management differs a bit from Angular's so I tried to get that straight :D.
All the authentication stuff to Shopify itself seemed to work from the scaffold,
no additional changes made. All in all it was quite challenging having no prior experience with developing
Shopify app itself, it required quite some digging in the docs but nonetheless an exiting task to learn. 

### Development
Tried to use `graphql-codegen` to generate types after testing out different queries (added variant support later),
still used some interfaces I wrote myself.
Used Claude for code suggestions and type generation for other parts.

### Deployment
- Ran `shopify app deploy`
- Installed via dev dashboard

## Demo

https://drive.google.com/file/d/1_QbYZCGevos8OZDJW91QNmB6K89Lshe3/preview

If you can't preview the demo, there's `demo.mp4` file in the root directory (too large to preview in github).
