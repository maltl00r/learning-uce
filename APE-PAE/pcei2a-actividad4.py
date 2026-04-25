# Ejercicio: Comparación y promedio de tres números
#
# Instrucciones:
# Elaborar un programa en Python que solicite al usuario el ingreso
# de tres números y determine:
# - El número mayor
# - El número menor
# - El promedio de los tres números
#
# Requerimientos:
# - Usar input() para ingresar datos
# - Convertir a tipo numérico (float)
# - Aplicar estructuras condicionales o funciones como max() y min()
# - Mostrar resultados con print()
# - Mantener el código ordenado e indentado

numeros = []

try:

    for i in range(3): # Bucle para solicitar los tres números que solicita el enunciado
        numero = float(input(f"Ingrese el número #{i+1}: ")) # Variable para guardar el número a la lista 'numeros'
        numeros.append(numero) # Se añade los números a la lista 'nùmeros'. Resultado: [1, 2, 3]

except ValueError: # Si el valor ingresado no es un número, mostrará el siguiente mensaje
    print("El valor ingresado debe ser un número entero o decimal")

else: # Si no hay error, va a cumplirse el siguiente bloque de código
    max = max(numeros)
    min = min(numeros)
    promedio = sum(numeros) / len(numeros)

    # Salida: El número menor es 1.0, el número mayor es 3.0 y el promedio es 2.0
    print(f"El número menor es {min}, el número mayor es {max} y el promedio es {promedio}") 