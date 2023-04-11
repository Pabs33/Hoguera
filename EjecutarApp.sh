#! bin/bash

#script para poder ejecutar la aplicacion de la loteria de la hoguera 

#Ejecutar el servicio de MySQL
service MySQL start

#Ejecutar en segundo plano el servidor backend
cd Back
npx nodemon index.js&

echo "servidor BackEnd listo, para acceder a la guia de la API acceder a localhost:3000"

#Ejecutar en segundo plano el servidor frontend
cd ..
cd Front/HogueraFront
npm start&

echo "servidor FrontEnd ejecutado, espera un poco hasta que este listo y luego accede a localhost:4200 para usar la app"

salir = false

while [!$salir]
do
    echo "introduce acabar para cerrar todos los procesos"
    read acabar
    if [$acabar = "acabar"]
    then
    #TODO buscar que procesos arranca nodemon y angular, buscar su PID y matarlos
    #TODO Igual es mejor usar python para este script
    $salir = true
    fi
done