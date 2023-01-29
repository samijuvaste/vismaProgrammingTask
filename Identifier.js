const { scheme, acceptedPaths } = require('./config')

class Identifier {
    #path
    #parameters
    constructor(uri) {
        this.#path = this.#setPath(uri)
        this.#parameters = this.#setParameters(uri)
    }

    //returns if scheme of the URI is valid
    #validScheme(uri) {
        if (typeof uri !== 'string') {
            return false
        }
        return uri.startsWith(`${scheme}://`)
    }

    //returns path if scheme and path are valid, otherwise null
    #setPath(uri) {

        if (!this.#validScheme(uri)) {
            return null
        }

        const parts = uri
            .substring(scheme.length + 3) //removes scheme:// from beginning
            .split('?')
        
        //if '?' is missing after path, null is returned
        if (parts.length === 1) {
            return null
        }

        const path = parts[0]

        if (Object.keys(acceptedPaths).includes(path)) {
            return path
        }

        return null
    }

    //returns parameters if scheme, path and parameters are valid, otherwise null
    #setParameters(uri) {
        if (this.#path === null) {
            return null
        }

        const requirements = acceptedPaths[this.#path]

        const parameters = new Map()

        //array that has the parameters as key-value-arrays
        const parameterStrings = uri
            .substring(
                uri.indexOf('?') + 1 //removes everything before '?'
            )
            .split('&')
            .map(pair => pair.split('='))


        //checks that there is correct amount of parameters and
        //all key-value-arrays are of correct length
        if (
            parameterStrings.length !== Object.keys(requirements).length ||
            !parameterStrings.every(pair => pair.length === 2)
        ) {
            return null
        }

        //sets parameters to Map
        parameterStrings.forEach(pair => {
            parameters.set(pair[0], pair[1])
        })

        //goes through the requirements
        for (const [requirement, type] of Object.entries(requirements)) {
            const parameter = parameters.get(requirement)

            //null is returned if required parameter is missing
            if (!parameter) {
                return null
            }

            //if different types of parameters are added later
            //they can be handled here
            switch (type) {
                case 'string':
                    break
                case 'integer': //if given parameter is not integer, null is returned
                    if (!Number.isInteger(Number(parameter))) {
                        return null
                    } //otherwise sets parameter as integer to Map
                    parameters.set(requirement, Number(parameter))
                    break
            }
        }

        return parameters
    }
    
    //public method that tells if input URI is valid
    isValid() {
        return this.#parameters !== null
    }

    //public getter for path
    getPath() {
        return this.#path
    }

    //public getter for parameters
    getParameters() {
        return this.#parameters
    }

    //public method for changing URI
    resetInput(uri) {
        this.#path = this.#setPath(uri)
        this.#parameters = this.#setParameters(uri)
    }
}

module.exports = { Identifier }