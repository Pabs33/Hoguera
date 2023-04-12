import subprocess

#Metodo encargado de matar los procesos que se generan
def matarProcesos(nombreProceso):
    comando = "ps -C " + nombreProceso
    p = subprocess.Popen(comando, stdout=subprocess.PIPE, shell=True)
    pid = p.communicate().split(" ")[0]
    subprocess.run("kill", pid)

#script para poder ejecutar la aplicacion de la loteria de la hoguera 

#Ejecutar el servicio de MySQL
subprocess.run("service", "MySQL", "start")

#Ejecutar en segundo plano el servidor backend
subprocess.run("cd", "Back")
subprocess.run("npx", "nodemon", "index.js&")

print("servidor BackEnd listo, para acceder a la guia de la API acceder a localhost:3000")

#Ejecutar en segundo plano el servidor frontend
subprocess.run("cd", "..")
subprocess.run("cd", "Front/HogueraFront")
subprocess.run("npm", "start&")

print("servidor FrontEnd ejecutado, espera un poco hasta que este listo y luego accede a localhost:4200 para usar la app")

salir = False

while (salir != True):
    acabar = input("introduce acabar para cerrar todos los procesos")
    if(acabar == "acabar"):
        #TODO buscar que procesos arranca nodemon y angular, buscar su PID y matarlos
        #TODO Igual es mejor usar python para este script
        #Prueba de como quedaria:
        matarProcesos("angular")
        salir = True