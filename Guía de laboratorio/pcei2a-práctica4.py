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