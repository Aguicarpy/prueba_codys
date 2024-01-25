
export const renameImage = (req, file, callback) => { // --> función para recorrer la data del nombre de la imagen a cargar/actualizar
    const name = file.originalname.split('.'[0])
    const filename = file.originalname
    const randomName = Array(4).fill(null).map(() => Math.round(Math.random() * 16).toString(16)).join('')
    const finalFilename = `${randomName}-${filename}`;
    callback(null, finalFilename)
}

export const fileFilter = (req, file, callback) => {        // --> función que realiza la validación de formato de la imagen
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new Error('Formato invalido'), false)
    }
    callback(null, true)
}