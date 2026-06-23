import sqlite3
import tkinter as tk
from tkinter import ttk

conn = sqlite3.connect("negocio.db")
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS clientes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS productos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    precio REAL
)
""")

conn.commit()

def agregar_cliente():
    nombre = entrada_cliente.get()
    cursor.execute("INSERT INTO clientes (nombre) VALUES (?)", (nombre,))
    conn.commit()
    entrada_cliente.delete(0, tk.END)

def agregar_producto():
    nombre = entrada_producto.get()
    precio = entrada_precio.get()
    cursor.execute("INSERT INTO productos (nombre, precio) VALUES (?, ?)", (nombre, precio))
    conn.commit()
    entrada_producto.delete(0, tk.END)
    entrada_precio.delete(0, tk.END)

def mostrar():
    for i in tabla_clientes.get_children():
        tabla_clientes.delete(i)

    for i in tabla_productos.get_children():
        tabla_productos.delete(i)

    cursor.execute("SELECT id, nombre FROM clientes")
    for c in cursor.fetchall():
        tabla_clientes.insert("", tk.END, values=c)

    cursor.execute("SELECT id, nombre, precio FROM productos")
    for p in cursor.fetchall():
        tabla_productos.insert("", tk.END, values=p)


root = tk.Tk()
root.title("Negocio Marvin")

# clientes
tk.Label(root, text="CLIENTES").pack()

tk.Label(root, text="Nombre del cliente").pack()
entrada_cliente = tk.Entry(root)
entrada_cliente.pack()

tk.Button(root, text="Agregar cliente", command=agregar_cliente).pack()

tabla_clientes = ttk.Treeview(root, columns=("id", "nombre"), show="headings")
tabla_clientes.heading("id", text="ID")
tabla_clientes.heading("nombre", text="Nombre")
tabla_clientes.pack()

# productos
tk.Label(root, text="PRODUCTOS").pack()

tk.Label(root, text="Nombre del producto").pack()
entrada_producto = tk.Entry(root)
entrada_producto.pack()

tk.Label(root, text="Precio del producto").pack()
entrada_precio = tk.Entry(root)
entrada_precio.pack()

tk.Button(root, text="Agregar producto", command=agregar_producto).pack()

tabla_productos = ttk.Treeview(root, columns=("id", "nombre", "precio"), show="headings")
tabla_productos.heading("id", text="ID")
tabla_productos.heading("nombre", text="Nombre")
tabla_productos.heading("precio", text="Precio")
tabla_productos.pack()

tk.Button(root, text="Mostrar datos", command=mostrar).pack()

root.mainloop()