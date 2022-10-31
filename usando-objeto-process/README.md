### Ejecución
Guía de como proceder en el desafío *"usando el objeto porcess"*:

- En consola sitúandonos en la ruta correcta, ejecutamos npm start.
- Luego nos dirigimos a localhost:8080 que es donde nuestro servidor corre por defecto.
- A partir de allí podemos dirigirnos a los distintos endpoints que nos devuelven los procesos requeridos en el desafío.

## Endpoints:
1. *http://localhost:8080/* : Nos lleva a la pantalla de logueo o registro sie es nuestra primera vez.
2. *http://localhost:8080/info* : Nos muestra la información de nuestro sistema utilizando *process* según lo solicitado en el desafío.
3. *http://localhost:8080/api/* : Nos devuelve una cantidad de números aleatorios según el parámetro que le pasemos o 100 millones si no lo hacemos.

# Observaciones
- En el archivo **child.js** se encuentra la función de números aleatorios solicitada que luego es volcada al front mediante el objeto **process**.
- Se utilizo *ejs* como motor de plantilla.
- Se encuentra la variable de entorno nuestra base de datos.
