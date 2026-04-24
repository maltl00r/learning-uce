    # Manejo de Excepciones
    # Taller Grupal: Calculadora Simple con Control de Errores
    #
    # Los estudiantes trabajarán en pares o en grupos (máximo 3 personas).
    # El objetivo es analizar un código de una calculadora básica, identificar
    # posibles puntos de fallo y aplicar manejo de excepciones para evitar
    # que el programa se detenga inesperadamente.
    #
    # Descripción de la actividad:
    #
    # Se proporciona un código inicial de una calculadora que realiza
    # operaciones básicas (+, -, *, /). Sin embargo, este código es propenso
    # a errores si el usuario ingresa datos incorrectos o realiza operaciones inválidas.
    #
    # Los estudiantes deben:
    #
    # 1. Identificar los puntos de fallo en el código:
    #    - Conversión de texto a número (float)
    #    - División por cero
    #    - Operaciones no válidas
    #    - Otros errores inesperados
    #
    # 2. Implementar manejo de excepciones utilizando bloques try...except
    #    para evitar que el programa se cierre abruptamente.
    #
    # Tipos de errores a manejar:
    #
    # - ValueError:
    #   Ocurre cuando el usuario ingresa texto en lugar de un número.
    #   Ejemplo: "hola", "diez"
    #   Acción: Mostrar un mensaje claro indicando que debe ingresar un valor numérico.
    #
    # - ZeroDivisionError:
    #   Ocurre cuando se intenta dividir entre cero.
    #   Acción: Mostrar un mensaje indicando que no es posible realizar esa operación.
    #
    # - Exception (general):
    #   Captura cualquier otro error inesperado.
    #   Acción: Mostrar un mensaje genérico indicando que ocurrió un error.
    #
    # Objetivo:
    # Garantizar que el programa sea más robusto, evitando fallos y mejorando
    # la experiencia del usuario mediante mensajes claros y controlados.
    #
    # Evaluación:
    # El taller será evaluado en clase mediante la rúbrica de evaluación (ver Anexo 4).
def calculadora():
    print("--- Calculadora Simple ---")
    
    try:
        # 1. Solicitar el primer número
        num1_str = input("Ingrese el primer número: ")
        num1 = float(num1_str) # Punto de posible fallo A (ValueError)
        
        # 2. Solicitar el segundo número
        num2_str = input("Ingrese el segundo número: ")
        num2 = float(num2_str) # Punto de posible fallo B (ValueError)
        
        # 3. Solicitar la operación
        operacion = input("Ingrese la operación (+, -, *, /): ")
        
        resultado = 0
        
        # 4. Realizar la operación
        if operacion == '+':
            resultado = num1 + num2
        elif operacion == '-':
            resultado = num1 - num2
        elif operacion == '*':
            resultado = num1 * num2
        elif operacion == '/':
            resultado = num1 / num2 
            # Punto de posible fallo C (ZeroDivisionError)
        else:
            # Punto de posible fallo D (Operación no válida)
            print("Error: Operación no válida.")
            return 

        # 5. Imprimir el resultado
        print(f"\nEl resultado de la operación es: {resultado}")

    except ValueError:
        # Manejo de error si el usuario ingresa texto en lugar de números
        print("Error: Debe ingresar un valor numérico válido.")

    except ZeroDivisionError:
        # Manejo de error si se intenta dividir por cero
        print("Error: No se puede dividir por cero.")

    except Exception:
        # Manejo de cualquier otro error imprevisto
        print("Error: Algo salió mal de forma inesperada.")
# Llamada al programa
calculadora()
