
Primero creamos las dependencias:

npm init -y; npm i express express-session connect-mongo cookie-parser mongoose express-handlebars

Sistema de Login por Formulario.

si el usuario no esta registrado lo enviamos a login.
si va a profile lo va a enviar siempre al login.
Si el usuario quiere registrarse va a ver un boton en login que lo lleve a la plantilla de register.
si el usuario ya inicio sesion y quiere ir a login o register lo va a enviar a profile.




