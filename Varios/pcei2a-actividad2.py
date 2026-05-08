# Desarrolle un programa en Python que cumpla con lo siguiente:
# 
# 1. Permitir ingresar datos de varias personas:
# * Nombre
# * Cargo
# * Sueldo
# 2. Utilizar una función para el ingreso de datos.
# 3. Usar listas (arrays) para almacenar la información.
# 4. Implementar un ciclo con while True para repetir el ingreso de datos, hasta que el usuario decida salir.
# 5. Crear una función que calcule:
# * IVA (15%)
# * Descuento (10%)
# * Total a pagar
# 6. Usar un bucle while para recorrer los datos ingresados.
# 7. Mostrar los resultados en pantalla.

empleados = [] # Formato: [ {persona1}, {persona2} ] | { "nombre":x, "cargo": y, "sueldo": z }

def calcular_sueldo(sueldo): # Función para calcular el sueldo final
    iva = sueldo*1.15 # Ejemplo: 1000 + 15% = 1150
    descuento = sueldo*0.1 # Ejemplo: 10% de 1000 = 100
    return iva-descuento # Resultado: 1150 - 100 = 1050


while True: # Bucle para repetir el ingreso de usuarios
    try:
        nombre = input("Ingrese el nombre del empleado: ").upper()
        if not nombre:
            raise Exception("El nombre no puede ir vacío.") # Generar un error intencional
        
        cargo = input(f"Ingrese el cargo de {nombre}: ")
        if not cargo:
            raise Exception("El cargo no puede ir vacío.") # Generar un error intencional
        
        sueldo = float(input(f"Ingrese el sueldo de {nombre}: "))
        if not sueldo:
            raise Exception("El sueldo no puede ir vacío.") # Generar un error intencional
        
    except ValueError:
        print("Error: El sueldo ingreseado debe ser un número real. Vuelva a intentarlo.")

    except Exception as e: # Si se genera un error intencionado, lo imprime en la consola
        print(f"Error: {e}")
    else:
        sueldo_final = calcular_sueldo(sueldo)

        empleados.append( {"nombre": nombre, "cargo": cargo, "sueldo": sueldo_final} )

        salir = False # Variable que se usará como "llave" para salir del bucle inicial

        while True: # Bucle para pregunta si desea continuar hasta que ingrese una opción válida
            
            ### Bucle para preguntar si desea seguir agregando datos
            opcion  = input("¿Desea continuar llenando empleados? (s/n) ")



            if opcion == "n":
                print("Finaliando programa. Se van a imprimir los valores finales.")
                for i in empleados:
                    print("================")
                    print(f"Nombre: {i["nombre"]}")
                    print(f"Cargo: {i["cargo"]}")
                    print(f"Sueldo + IVA - 10%: {i["sueldo"]}")
                print("================")

                salir = True # Guarda la variable 'salir' como TRUE para salir del bucle inicial
                break # Sale del bucle de pregunta

            if opcion == "s":
                print("Volviendo a llenar datos de empleado...\n")
                break
            else:
                print("Opción no válida. ")

        if salir == True: 
            break