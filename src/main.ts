    // Definimos la interfaz para la validación
    interface ValidacionClave {
        esValida: boolean;
        error?: string;
    }
    
    // Función para validar que tenga mayúsculas y minúsculas
    const tieneMayusculasYMinusculas = (clave: string): ValidacionClave => {
        const tieneMayuscula = /[A-Z]/.test(clave);
        const tieneMinuscula = /[a-z]/.test(clave);
        
        if (!tieneMayuscula || !tieneMinuscula) {
        return { esValida: false, error: "La clave debe de tener mayúsculas y minúsculas" };
        }
        return { esValida: true };
    };
    
    // Función para validar que tenga números
    const tieneNumeros = (clave: string): ValidacionClave => {
        const tieneNumero = /\d/.test(clave);
        
        if (!tieneNumero) {
        return { esValida: false, error: "La clave debe de tener números" };
        }
        return { esValida: true };
    };
    
    // Función para validar que tenga caracteres especiales
    const tieneCaracteresEspeciales = (clave: string): ValidacionClave => {
        const tieneEspecial = /[@#_+\-!$%^&*(),.?":{}|<>]/.test(clave);
        
        if (!tieneEspecial) {
        return { esValida: false, error: "La clave debe de tener caracteres especiales" };
        }
        return { esValida: true };
    };
    
    // Función para validar longitud mínima
    const tieneLongitudMinima = (clave: string): ValidacionClave => {
        if (clave.length < 8) {
        return { esValida: false, error: "La clave debe de tener una longitud mínima de 8 caracteres" };
        }
        return { esValida: true };
    };
    
    // Función para validar que no contenga el nombre de usuario
    const tieneNombreUsuario = (nombreUsuario: string, clave: string): ValidacionClave => {
        if (clave.toLowerCase().includes(nombreUsuario.toLowerCase())) {
        return { esValida: false, error: "La clave no debe tener el nombre del usuario" };
        }
        return { esValida: true };
    };
    
    // Función para validar que no contenga palabras comunes
    const tienePalabrasComunes = (clave: string, commonPasswords: string[]): ValidacionClave => {
        const claveLower = clave.toLowerCase();
        
        for (const palabra of commonPasswords) {
        if (claveLower.includes(palabra.toLowerCase())) {
            return { esValida: false, error: "La clave no debe de contener palabras comunes" };
        }
        }
        return { esValida: true };
    };
    
    // Función principal que combina todas las validaciones
    const validarClave = (
        nombreUsuario: string,
        clave: string,
        commonPasswords: string[]
    ): ValidacionClave => {
        let validacion: ValidacionClave;
    
        validacion = tieneMayusculasYMinusculas(clave);
        if (!validacion.esValida) return validacion;
    
        validacion = tieneNumeros(clave);
        if (!validacion.esValida) return validacion;
    
        validacion = tieneCaracteresEspeciales(clave);
        if (!validacion.esValida) return validacion;
    
        validacion = tieneLongitudMinima(clave);
        if (!validacion.esValida) return validacion;
    
        validacion = tieneNombreUsuario(nombreUsuario, clave);
        if (!validacion.esValida) return validacion;
    
        validacion = tienePalabrasComunes(clave, commonPasswords);
        if (!validacion.esValida) return validacion;
    
        return { esValida: true };
    };

    // Lista de contraseñas comunes
    const commonPasswords: string[] = [
        "password", "123456", "qwerty", "admin", "letmein", "welcome", "monkey",
        "sunshine", "password1", "123456789", "football", "iloveyou", "1234567",
        "123123", "12345678", "abc123", "qwerty123", "1q2w3e4r", "baseball",
        "password123", "superman", "987654321", "mypass", "trustno1", "hello123",
        "dragon", "1234", "555555", "loveme", "hello", "hockey", "letmein123",
        "welcome123", "mustang", "shadow", "12345", "passw0rd", "abcdef", "123abc",
        "football123", "master", "jordan23", "access", "flower", "qwertyuiop",
        "admin123", "iloveyou123", "welcome1", "monkey123", "sunshine1", "password12",
        "1234567890",
    ];
    
    // Ejemplos de uso
    const pruebas = [
        { nombreUsuario: "juan", clave: "Password123@", descripcion: "Clave válida" },
        { nombreUsuario: "maria", clave: "password", descripcion: "Palabra común" },
        { nombreUsuario: "carlos", clave: "Carlos123@", descripcion: "Contiene nombre usuario" },
        { nombreUsuario: "ana", clave: "abc", descripcion: "Clave demasiado corta" },
        { nombreUsuario: "luis", clave: "abcdefghi", descripcion: "Solo minúsculas" },
        { nombreUsuario: "lucia", clave: "PASSWORD123", descripcion: "Solo mayúsculas y números" },
        { nombreUsuario: "pedro", clave: "Password@", descripcion: "No tiene números" },
        { nombreUsuario: "antonio", clave: "peRiquito!8356", descripcion: "La clave es válida" },
    ];
    
    pruebas.forEach(({ nombreUsuario, clave }, index) => {
        const resultado = validarClave(nombreUsuario, clave, commonPasswords);
        
        const descripcion = resultado.esValida
            ? "Clave válida"
            : resultado.error || "Clave inválida";
        
        console.log(`\nPrueba ${index + 1}:`);
        console.log(`Clave: ${clave}`);
        console.log(`¿Es válida?: ${resultado.esValida}`);
        console.log(`Descripción: ${descripcion}`);
    });    