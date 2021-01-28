# Prueba Teórica

## Respuestas:

- 1 Que problemas detectas en la operación y razona la respuesta.

  Problemas que detecto es que en la estructura de control `if` se referencia a la variable `service` en las dos primeras sentencias y a `multimediaContent` en la última. Sería mejor refenciar a `multimediaContent` para hacer el código más consistente y evitar errores.

  En las clases del modelo implementaría PremiumContent como servicio con su correspondiente quota.

  Por otra parte la función `getTotal()` se le ha asignado toda la lógica para manejar los datos. Sería mejor aplicar los principios SOLID y asignar una única responsabilidad a la funcion `getTotal()` y encapsulando cada sentencia `if` dentro de su propia función. 
  
  Se podría crear una clase que maneje el cálculo de cada servicio y excluir `getTotal` de RegisteredUser y añadirla a `Service` ya que no tiene sentido calcular precios en una clase `RegisterdUser`.

  Un ejemplo con pseudocódigo podría ser de la siguiente manera:

  ```
  class Service {
    constructor(services = []) {
      this.services = services;
    }

    getStreamingPrice() {
        // lógica para devolver precio del servicio
    }

    getDownloadPrice() {
      // lógica para devolver precio del servicio
    }

    getPremiumPrice() {
      // lógica para devolver precio del servicio
    }
    
    getTotal() {
      // lógica para devolver precio final

      // Servicio Streaming
      this.getStreamingPrice()

      // Servicio Download
      this.getDownloadPrice()

      // Servicio Premiumç
      this.getPremiumPrice()
    }
  }
  
  ```
