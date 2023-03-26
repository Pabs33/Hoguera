#! bin/bash

#script para poder ejecutar la aplicacion de la loteria de la hoguera 

#Ejecutar en segundo plano el servidor backend
cd Back
npx nodemon index.js&

echo "servidor BackEnd listo, para acceder a la guia de la API acceder a localhost:3000"

#Ejecutar en segundo plano el servidor frontend
cd ..
cd Front/HogueraFront
npm start&

echo "servidor FrontEnd ejecutado, espera un poco hasta que este listo y luego accede a localhost:4200 para usar la app"