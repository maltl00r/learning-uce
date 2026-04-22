# Taller grupal para la resolución de problemas cotidianos
# mediante el uso de listas y sus métodos en Phyton.

lista=[]
filas=int(input("ingrese numero de filas: "))
columnas=int(input("ingrese numero de columnas:" ))

for i in range(filas):
    fila=[]
    for j in range (columnas):
        while True:
            fi=int(input(f"ingrese un valor {i}{j}: "))
            if fi % 2 == 0:
                fila.append(fi)
            else:
                print("ingrese un numero par")
              break
    lista.append(fila)

for i in lista:
    lista.sort()
    for j in i:
        j.sort()
        
for i in lista:
    print(i)
