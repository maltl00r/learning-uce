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
                if fi == 0:
                    print("Ingrese un número diferente de 0")
                else:
                    fila.append(fi)
                    break
            else:
                print("ingrese un numero par")
    lista.append(fila)

for i in lista:
    i.sort()
        
for i in lista:
    print(i)










# Parte dos
lista=[]
x=int(input("ingrese la cantidad de columnas:"))
y=int(input("ingrese la cantidad de filas:"))

for i  in range(y):
    fila=[]
    for j in range(x):
            fila.append(input(f"ingrese el elemento de x={i},y={j}:"))
    lista.append(fila)
    
def imprimir_lista():
    for i in lista:
        for j in i:
            print(j,end="")
        print()
        
o=input("¿desea ordenar la lista si/no?:")
if o == "si":
    for i in lista:
        fila.sort()
    imprimir_lista()
else:
    imprimir_lista()
        
