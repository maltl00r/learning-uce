# Array
# Ejercicio Práctico: Procesamiento de Notas en Matrices
#
# Los estudiantes deberán desarrollar un programa en Python que permita
# capturar, procesar y mostrar las calificaciones de un grupo de estudiantes
# considerando lo siguiente:
#
# 1. Crear 2 listas: ✅
#    - Estudiantes: 3 (Estudiante 1, Estudiante 2, Estudiante 3) 
#    - Asignaturas: Programación I, Matemática I, Didáctica, Psicología (4 asignaturas) 
#
# 2. Captura de datos (entrada): ✅
#    - El programa debe solicitar al usuario que ingrese las notas de cada estudiante
#      para cada una de las 4 asignaturas. 
#    - Asegúrate de que las notas estén en el rango de 0 a 20. 
#    - Se requiere validación estricta usando una estructura repetitiva
#      hasta que el valor cumpla la condición. 
#
# 3. Almacenamiento de datos (matriz): ✅
#    - Las notas ingresadas deben almacenarse en una matriz llamada notas_matriz. 
#    - Cada fila representa a un estudiante.
#    - Cada columna representa una asignatura.
#
# 4. Procesamiento y salida: ✅
#    - Mostrar la matriz:
#      Imprimir en pantalla la matriz completa para verificar los datos ingresados.
#
#    - Cálculo de promedios:
#      El programa debe iterar sobre la matriz para calcular el promedio
#      de cada asignatura.
#      * Se deben obtener 4 promedios:
#        Promedio en Programación I, Matemática I, Didáctica y Psicología.
#
#    - Almacenamiento de resultados:
#      Los 4 promedios deben guardarse en una lista llamada
#      promedios_asignaturas.
#
#    - Imprimir lista de promedios:
#      Mostrar la lista en consola de forma clara, indicando
#      a qué asignatura corresponde cada promedio.
#
# 5. Evaluación:
#    El ejercicio será evaluado en clase mediante la rúbrica
#    de evaluación (ver Anexo 2).

asig=("Programación I", "Matemática I", "Didáctica", "Psicología")
estudiantes=[]
notas_matriz=[]
promedios_asignatura=[]

i = 0


# Registro de estudiantes y sus notas
while True: # Bucle para ingresar un estudiante.
    nombre=input(f"A continuación, deberá ingresar el nombre del estudiante #{i+1} para añadirlo a la lista (Escriba 'salir' si desea salir): ").upper()
    if nombre=='salir'.upper(): # Se sale del bucle si el usuario escribe 'salir'
        break
    else: # Se continúa con el registro del usuario
        estudiantes.append(nombre) # Se guarda el nombre del estudiante en la lista 'estudiantes'
        notas=[] # Se crea una lista vacía para almacenar las notas por cada estudiante de manera temporal. Resultado: [20.0, 20.0, 20.0, 20]
        j=0 # Variable para utilizar en un bucle
        while True: # Bucle para ingresar la nota de cada asignatura
            if j==len(asig): # Se sale del bucle si la variable 'j' es igual a la cantidad de asignaturas
                break
            else:
                nota = float(input(f"Ingrese la nota para la materia {asig[j]} del estudiante {estudiantes[i]}: "))
                if nota >= 0 and nota <= 20: # Valida que la calificación sea entre 0 y 20
                    notas.append(nota) # Si la calificación cumple dicha condición, se guarda la nota en la lista de 'notas'
                    j+=1 
                else:
                    print("La nota debe estar entre 0 y 20")
        notas_matriz.append(notas)  # Se añaden las notas de la lista 'notas' a la lista 'notas_matriz'. Resultado [[notas], [notas]]      
        i += 1 

#Registro de promedios en la asignatura
for i in range(len(asig)): # Bucle que se va a repetir por cada asignatura
    suma = 0 # Variable temporal para guardar la suma de todas las calificaciones
    for j in range(len(notas_matriz)): # Bucle que se va a repetir por cada estudiante
        suma += notas_matriz[j][i] # Se va a sumar la nota de cada COLUMNA
    promedio = suma / len(notas_matriz) # Se va a promediar y guardar en la variable temporal 'promedio'
    promedios_asignatura.append(promedio) # Guarda el promedio por cada ASIGNATURA en la lista 'promedios_asignatura'

# Muestra de datos
while True:
    print("---Opciones---")
    print("1. Obtener promedios por ASIGNATURA")
    print("2. Obtener promedios por ESTUDIANTE")
    print("3. Mostrar las matrices completas (debug)")
    print("4. Salir del programa")
    o=int(input("Ingrese una opción: "))
    if o==1:
        for i in range(len(asig)): # Bucle que se va a repetir para cada asignatura
            print(f"{asig[i]}: {promedios_asignatura[i]}")
    elif o==2:
        for i in range(len(estudiantes)): # Bucle que se va a repetir por cada estudiante
            print(f"{estudiantes[i]}: {sum(notas_matriz[i])/len(notas_matriz[i])}")
    elif o==3:
        print(estudiantes)
        print(asig)
        print(notas_matriz)
        print(promedios_asignatura)
    elif o==4:
        print("Gracias por usar el programa")
        break
    else:
        print("Opción no válida")