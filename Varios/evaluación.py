import sqlite3
from datetime import datetime, timedelta

def inicializar_bd():
    """Conecta a la base de datos y crea las tablas si no existen."""
    conn = sqlite3.connect("medicina.db")
    cursor = conn.cursor()
    
    # TABLA ESPECIALIDADES
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS Especialidades (
        id INTEGER PRIMARY KEY NOT NULL,
        nombre TEXT NOT NULL
    );
    """)
    
    # TABLA CLIENTES
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS Clientes (
        id INTEGER PRIMARY KEY NOT NULL,
        nombre TEXT NOT NULL,
        genero TEXT NOT NULL,
        edad INTEGER NOT NULL
    );
    """)
    
    # TABLA CITAS
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS Citas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cliente_id INTEGER NOT NULL,
        especialidad_id INTEGER NOT NULL,
        fecha TEXT NOT NULL,
        costo REAL NOT NULL,
        FOREIGN KEY (cliente_id) REFERENCES Clientes(id),
        FOREIGN KEY (especialidad_id) REFERENCES Especialidades(id)
    );
    """)
    
    # DATOS DE PRUEBA
    cursor.execute("SELECT COUNT(*) FROM Especialidades;")
    if cursor.fetchone()[0] == 0:
        cursor.executemany("""
        INSERT INTO Especialidades (id, nombre) VALUES (?, ?);
        """, [(1, 'Medicina Interna'), (2, 'Pediatría')])
        
    cursor.execute("SELECT COUNT(*) FROM Clientes WHERE id = 1207415660;")
    if cursor.fetchone()[0] == 0:
        cursor.execute("""
        INSERT INTO Clientes (id, nombre, genero, edad) VALUES (?, ?, ?, ?);
        """, (1207415660, 'Marvin Loor', 'Masculino', 22))
        
    conn.commit()
    conn.close()


def solicitar_cedula():
    """Solicita y valida que la cédula sea un número entero."""
    while True:
        try:
            id_cliente = int(input("Ingrese su número de cédula (solo números): "))
            return id_cliente
        except ValueError:
            print("Error: Ingrese un número de cédula válido, sin guiones.")


def registrar_cliente(id_cliente):
    """Registra un nuevo cliente en la base de datos."""
    print("\n--- El usuario indicado no existe. Procediendo a registrar ---")
    nombre = input("Ingrese su nombre: ").strip()
    genero = input("Ingrese su género: ").strip()
    
    while True:
        try:
            edad = int(input("Ingrese su edad: "))
            if edad < 0:
                print("La edad no puede ser negativa.")
                continue
            break
        except ValueError:
            print("Error: Debe ingresar una edad válida.")
            
    conn = sqlite3.connect("medicina.db")
    cursor = conn.cursor()
    try:
        cursor.execute("""
        INSERT INTO Clientes (id, nombre, genero, edad) VALUES (?, ?, ?, ?);
        """, (id_cliente, nombre, genero, edad))
        conn.commit()
        print("¡Se ha creado el cliente con éxito!")
    except sqlite3.Error as e:
        print(f"Error al registrar en la base de datos: {e}")
    finally:
        conn.close()


def agendar_citas(id_cliente):
    """Maneja el flujo de agendamiento de citas."""
    conn = sqlite3.connect("medicina.db")
    cursor = conn.cursor()
    
    # PEDIR CANTIDAD DE CITAS
    while True:
        try:
            veces = int(input("\n¿Cuántas citas desea agendar? "))
            if veces <= 0:
                print("Debe agendar al menos 1 cita.")
                continue
            break
        except ValueError:
            print("Error: Debe ingresar solo números enteros.")
            
    # MOSTRAR ESPECIALIDADES
    cursor.execute("SELECT id, nombre FROM Especialidades;")
    especialidades = cursor.fetchall()
    
    print("\n--- Especialidades Disponibles ---")
    for esp_id, esp_nombre in especialidades:
        print(f"[{esp_id}] - {esp_nombre}")
    print("---------------------------------")
    
    lista_ids_especialidades = [esp[0] for esp in especialidades]
    costo_consulta = 15.00  # Límite máximo ($15 USD)
    
    # CALCULAR LA FECHA DE MAÑANA
    fecha_cita = (datetime.now() + timedelta(days=1)).strftime("%Y-%m-%d %H:%M:%S")
    
    # GUARDAR CADA CITA
    for i in range(1, veces + 1):
        while True:
            try:
                especialidad = int(input(f"Por favor, elija el número de la especialidad de su cita #{i}: "))
                if especialidad not in lista_ids_especialidades:
                    print("Error: Esa especialidad no existe en el catálogo.")
                    continue
                break
            except ValueError:
                print("Error: Debe ingresar un número válido para una especialidad.")
        
        # GUARDAR LA CITA EN LA DB
        cursor.execute("""
        INSERT INTO Citas (cliente_id, especialidad_id, fecha, costo) 
        VALUES (?, ?, ?, ?);
        """, (id_cliente, especialidad, fecha_cita, costo_consulta))
        
    conn.commit()
    
    # VALOR TOTAL A PAGAR
    total_pagar = veces * costo_consulta
    print(f"\n>>> Registro completo. El valor total a pagar por las {veces} citas es: ${total_pagar:.2f} USD.")
    conn.close()


def main():
    inicializar_bd()
    print("=== SISTEMA DE GESTIÓN MÉDICA 'MEDICINA' ===")
    
    while True:
        id_cliente = solicitar_cedula()
        
        # VERIFICACIÓN DE CLIENTE
        conn = sqlite3.connect("medicina.db")
        cursor = conn.cursor()
        cursor.execute("SELECT id FROM Clientes WHERE id = ?;", (id_cliente,))
        cliente_existe = cursor.fetchone()
        conn.close()
        
        if cliente_existe:
            print("\nUsuario encontrado en el sistema.")
            agendar_citas(id_cliente)
        else:
            registrar_cliente(id_cliente)
            agendar_citas(id_cliente)
            
        # OPCIÓN PARA SALIR
        salir = input("\n¿Desea realizar otra operación? (S/N): ").strip().upper()
        if salir != 'S':
            print("Gracias por usar el sistema médico. ¡Hasta luego!")
            break

if __name__ == "__main__":
    main()