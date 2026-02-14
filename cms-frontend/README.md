# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

-upload  title + image,
-View all upload contents,
-Edit (update) title + image,
-Delete content

Frontend is built with **React  + Tailwind css**

Backend is built with  **Node.js + Express.js**

Database used is       **Sqlite**

## features 

upload new content (title+image) 

Display all uploaded data in Ui 

update content (PUT API)

Delete content (DELETE API)

Images stored in uploads folder 

Sqlite database integration 

## Frontend  

- React + Vite 

- Tailwind CSS 

- Fetch API 

## Backend  

- Node.js 

- Express.js 

- Multer (file upload)

- Sqlite 
        table name (contents) 
          - id  (int prim key)
          - title (text) 
          - image (text)

## Project Folder Structure 

Backend: cms-backend
            |__
                - node_modules 
                - router
                    |_ cms.js
                - uploads 
                - app.http 
                - cmsData.db 
                - db.js 
                - package-lock.json
                - package.json
                - server.js 

Frontend: cms-frontend 
             |__ src 
                  |
                  - assets 
                  - components 
                        | 
                         - CMSPage / index.js 

                         - HomePage / index.js
                  - App.css 
                  - App.jsx 
                  - index.css 
                  - main.jsx
             - package.json
             - tailwind.config.js 

## Backend 
    cd cms-backend 
    npm install 
    node server.js 
    
    http://localhost:3000/ 



## Frontend  
   cd cms-frontend 
   npm install
   npm run dev 

   http://localhost:5173  

## API's

    - POST  https://cms-backend-lr46.onrender.com/api/contents -create content

    - GET   https://cms-backend-lr46.onrender.com/api/contents - all content

    - PUT   https://cms-backend-lr46.onrender.com/api/contents/:id - update content

    - DELETE https://cms-backend-lr46.onrender.com/api/contents/:id - delete content

## Render Deploy:
   - https://cms-backend-lr46.onrender.com 


## Vercel Deploy:
   - https://cms-project-rouge.vercel.app