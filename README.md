# Proyecto de Aula - Sistema de Gestión

## Descripción

Este proyecto corresponde al desarrollo de un sistema de gestión como proyecto de aula.

El sistema permite administrar diferentes elementos del proceso de gestión, incluyendo usuarios, clientes, categorías, productos y ventas.

El proyecto integra programación y bases de datos, utilizando una estructura organizada que permite facilitar el desarrollo, mantenimiento y escalabilidad del sistema.


## Objetivo

Desarrollar un sistema de información que permita gestionar de manera organizada los datos relacionados con usuarios, clientes, productos, categorías y ventas, utilizando una base de datos relacional y una aplicación de software.


## Tecnologías

* **Lenguaje de programación:** Por definir
* **Base de datos:** MySQL
* **Control de versiones:** Git
* **Repositorio:** GitHub
* **IDE:** Por definir


## Funcionalidades

El sistema contempla inicialmente las siguientes funcionalidades:

* Gestión de usuarios.
* Gestión de roles.
* Gestión de clientes.
* Gestión de categorías.
* Gestión de productos.
* Control de inventario.
* Registro de ventas.
* Registro del detalle de cada venta.
* Consulta de información.
* Control de estados de los registros.


## Base de datos

La base de datos utilizada en el proyecto se denomina:

```text
inventario_panaderia
```

El sistema utiliza un modelo de base de datos relacional desarrollado en MySQL.

### Tablas principales

| Tabla           | Descripción                                     |
| --------------- | ----------------------------------------------- |
| `roles`         | Almacena los diferentes roles del sistema.      |
| `usuarios`      | Almacena los usuarios que utilizan el sistema.  |
| `categorias`    | Almacena las categorías de los productos.       |
| `productos`     | Almacena la información de los productos.       |
| `clientes`      | Almacena la información de los clientes.        |
| `ventas`        | Registra las ventas realizadas.                 |
| `detalle_venta` | Registra los productos incluidos en cada venta. |


## Relaciones de la base de datos

La estructura de relaciones principal es:

```text
ROLES
  │
  │ 1:N
  ▼
USUARIOS
  │
  │ 1:N
  ▼
VENTAS ◄──────── CLIENTES
  │
  │ 1:N
  ▼
DETALLE_VENTA
  │
  │ N:1
  ▼
PRODUCTOS
  │
  │ N:1
  ▼
CATEGORIAS
```

### Relaciones

* Un **rol** puede estar asociado a varios usuarios.
* Un **usuario** puede registrar varias ventas.
* Un **cliente** puede realizar varias ventas.
* Una **venta** puede contener varios detalles.
* Un **producto** puede aparecer en diferentes ventas.
* Una **categoría** puede contener varios productos.


## Estructura del proyecto

```text
proyecto-aula/
│
├── README.md
│
├── .gitignore
│
├── database/
│   ├── 01_create_database.sql
│   ├── 02_create_tables.sql
│   ├── 03_insert_data.sql
│   └── 04_queries.sql
│
├── src/
│   ├── config/
│   ├── models/
│   ├── controllers/
│   ├── views/
│   └── main.*
│
├── docs/
│   ├── requerimientos.md
│   ├── modelo-entidad-relacion.png
│   ├── modelo-relacional.png
│   ├── diccionario-datos.md
│   └── manual-usuario.md
│
├── tests/
│
└── assets/
    └── imagenes/
```


## Instalación

### 1. Clonar el repositorio

```bash
git clone URL_DEL_REPOSITORIO
```

### 2. Ingresar al proyecto

```bash
cd inventario-panaderia
```

### 3. Crear la base de datos

Abrir MySQL, MySQL Workbench o el gestor de base de datos utilizado.

Ejecutar los archivos SQL en el siguiente orden:

```text
01_create_database.sql
02_create_tables.sql
03_insert_data.sql
04_queries.sql
```

El archivo `01_create_database.sql` crea la base de datos y el archivo `02_create_tables.sql` crea las tablas y sus relaciones.

### 4. Configurar la conexión

Configurar en el proyecto los datos de conexión a MySQL:

```text
Servidor: localhost
Puerto: 3306
Base de datos: inventario_panaderia
Usuario: [usuario]
Contraseña: [contraseña]
```

Las credenciales reales no deben publicarse en GitHub.

---

## Base de datos: orden de creación

Las tablas deben crearse respetando las relaciones existentes.

El orden utilizado es:

```text
1. roles
2. usuarios
3. categorias
4. productos
5. clientes
6. ventas
7. detalle_venta
```

Esto permite crear primero las tablas que son referenciadas por otras mediante claves foráneas.

---

## Control de versiones

El proyecto utiliza Git para controlar las diferentes versiones del código.

Ejemplo de creación de una rama:

```bash
git checkout -b feature/nueva-funcionalidad
```

Agregar cambios:

```bash
git add .
```

Crear un commit:

```bash
git commit -m "Agrega nueva funcionalidad"
```

Subir la rama:

```bash
git push origin feature/nueva-funcionalidad
```


## Ramas principales

Se propone utilizar la siguiente estructura:

```text
main
│
└── develop
    │
    ├── feature/base-datos
    ├── feature/login
    ├── feature/productos
    ├── feature/clientes
    └── feature/ventas
```

La rama `main` contiene las versiones estables del proyecto.

La rama `develop` se utiliza para integrar las funcionalidades antes de incorporarlas a `main`.

Las ramas `feature/*` se utilizan para desarrollar funcionalidades específicas.


## Seguridad

Por motivos de seguridad, no se deben subir al repositorio:

* Contraseñas reales.
* Claves API.
* Tokens.
* Credenciales de bases de datos.
* Archivos `.env` con información privada.
* Información personal real de usuarios o clientes.

Para la configuración local se recomienda utilizar variables de entorno.


## Estado del proyecto

**En desarrollo.**

Las funcionalidades y tecnologías pueden modificarse conforme avance el proyecto y se definan los requerimientos definitivos.


## Autores

* Tomas Felipe Bonilla Rodriguez
* Yerick...
* Leandro...


## Licencia

Proyecto desarrollado con fines académicos.

## Referencias bibliográficas

* Dietrich, D. (2025). *Readme template for software*. Cornell University eCommons Repository. https://doi.org/10.7298/h85a-qz91

* Johns Hopkins University. (s. f.). *Public code repository best practices*. Open Source Programs Office. https://ospo.library.jhu.edu/learn-grow/public-code-repository-best-practices/

* Oracle. (2026). *MySQL 8.4 Reference Manual: FOREIGN KEY constraints*. MySQL. https://dev.mysql.com/doc/refman/8.4/en/create-table-foreign-keys.html

* University of Toronto. (s. f.). *ACCEU Software Documentation Module: Part 4*. Department of Computer Science. https://www.cs.toronto.edu/~calver/acceu/part4.html

